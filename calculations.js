export class CharacterCalculator {
    constructor(form) {
        this.form = form;
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Ability score listeners
        const abilityInputs = this.form.querySelectorAll('[name$="_score"], [name$="_bonus"]');
        abilityInputs.forEach(input => {
            input.addEventListener('change', () => this.updateAbilityScores());
        });

        // AC listeners
        const acInputs = this.form.querySelectorAll('[name="ac_prof"], [name="ac_item"]');
        acInputs.forEach(input => {
            input.addEventListener('change', () => this.calculateAC());
        });

        // Saving throw listeners
        const saveInputs = this.form.querySelectorAll('[name$="_save_prof"], [name$="_save_item"]');
        saveInputs.forEach(input => {
            input.addEventListener('change', () => this.calculateSavingThrows());
        });

        // Class DC listeners
        const dcInputs = this.form.querySelectorAll('[name="classDcKeyAbility"], [name="classDcProf"], [name="classDcItem"]');
        dcInputs.forEach(input => {
            input.addEventListener('change', () => this.calculateClassDC());
        });

        // Strike listeners
        const strikeInputs = this.form.querySelectorAll('.melee-strike input, .melee-strike select, .ranged-strike input, .ranged-strike select');
        strikeInputs.forEach(input => {
            input.addEventListener('change', () => this.calculateStrikes());
        });
    }

    updateAbilityScores() {
        const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
        const BASE_ABILITY_POINTS = 80;
        const POINTS_PER_LEVEL = 5;
        
        // Get character level and calculate point limit
        const level = parseInt(this.form.querySelector('[name="level"]')?.value) || 1;
        const ABILITY_SCORE_LIMIT = BASE_ABILITY_POINTS + ((level - 1) * POINTS_PER_LEVEL);
        
        // Get selected ancestry, background and class
        const ancestry = this.form.querySelector('[name="ancestry"]')?.value || '';
        const background = this.form.querySelector('[name="background"]')?.value || '';
        const characterClass = this.form.querySelector('[name="class"]')?.value || '';

        // Get bonuses
        const ancestryBonuses = this.getAncestryBonuses(ancestry);
        const backgroundBonuses = this.getBackgroundBonuses(background);
        const classBonuses = this.getClassBonuses(characterClass);
        
        // Calculate total score for all abilities
        let totalScore = 0;
        abilities.forEach(ability => {
            const score = parseInt(this.form.querySelector(`[name="${ability}_score"]`)?.value) || 10;
            totalScore += score;
        });

        // Show warning if total score exceeds limit
        const warningElement = document.getElementById('totalPointsWarning');
        if (warningElement) {
            if (totalScore > ABILITY_SCORE_LIMIT) {
                warningElement.textContent = `Total ability scores cannot exceed ${ABILITY_SCORE_LIMIT} points at level ${level}`;
                warningElement.classList.remove('d-none');
                return; // Don't update scores if limit is exceeded
            } else {
                warningElement.classList.add('d-none');
            }
        }
        
        // Update ability scores and bonuses
        abilities.forEach(ability => {
            const score = parseInt(this.form.querySelector(`[name="${ability}_score"]`)?.value) || 10;
            const ancestryBonus = ancestryBonuses[ability] || 0;
            const backgroundBonus = backgroundBonuses[ability] || 0;
            const classBonus = classBonuses[ability] || 0;
            
            const total = score + ancestryBonus + backgroundBonus + classBonus;
            
            // Update ability total
            if (this.form.querySelector(`[name="${ability}_total"]`)) {
                this.form.querySelector(`[name="${ability}_total"]`).value = total;
            }
            
            // Update bonus displays
            if (this.form.querySelector(`[name="${ability}_ancestry_bonus"]`)) {
                this.form.querySelector(`[name="${ability}_ancestry_bonus"]`).value = ancestryBonus;
                this.form.querySelector(`[name="${ability}_ancestry_bonus"]`).classList.remove('text-success', 'text-danger', 'text-muted');
                if (ancestryBonus > 0) {
                    this.form.querySelector(`[name="${ability}_ancestry_bonus"]`).classList.add('text-success');
                } else if (ancestryBonus < 0) {
                    this.form.querySelector(`[name="${ability}_ancestry_bonus"]`).classList.add('text-danger');
                } else {
                    this.form.querySelector(`[name="${ability}_ancestry_bonus"]`).classList.add('text-muted');
                }
            }
            if (this.form.querySelector(`[name="${ability}_background_bonus"]`)) {
                this.form.querySelector(`[name="${ability}_background_bonus"]`).value = backgroundBonus;
                this.form.querySelector(`[name="${ability}_background_bonus"]`).classList.remove('text-success', 'text-danger', 'text-muted');
                if (backgroundBonus > 0) {
                    this.form.querySelector(`[name="${ability}_background_bonus"]`).classList.add('text-success');
                } else if (backgroundBonus < 0) {
                    this.form.querySelector(`[name="${ability}_background_bonus"]`).classList.add('text-danger');
                } else {
                    this.form.querySelector(`[name="${ability}_background_bonus"]`).classList.add('text-muted');
                }
            }
            if (this.form.querySelector(`[name="${ability}_class_bonus"]`)) {
                this.form.querySelector(`[name="${ability}_class_bonus"]`).value = classBonus;
                this.form.querySelector(`[name="${ability}_class_bonus"]`).classList.remove('text-success', 'text-danger', 'text-muted');
                if (classBonus > 0) {
                    this.form.querySelector(`[name="${ability}_class_bonus"]`).classList.add('text-success');
                } else if (classBonus < 0) {
                    this.form.querySelector(`[name="${ability}_class_bonus"]`).classList.add('text-danger');
                } else {
                    this.form.querySelector(`[name="${ability}_class_bonus"]`).classList.add('text-muted');
                }
            }
        });

        // Update traits display
        const traits = [];
        if (ancestry) traits.push(ancestry);
        if (background) traits.push(background);
        if (characterClass) traits.push(characterClass);
        
        const traitsElement = document.getElementById('selectedTraits');
        if (traitsElement) {
            traitsElement.textContent = traits.join(', ') || 'None';
        }

        // Update dependent calculations only if we're under the limit
        this.calculateAC();
        this.calculateSavingThrows();
        this.calculateSkills();
        this.calculateClassDC();
        this.calculateStrikes();
    }

    calculateAC() {
        const dexMod = parseInt(this.form.querySelector('[name="dexterity_mod"]')?.value) || 0;
        const prof = parseInt(this.form.querySelector('[name="ac_prof"]')?.value) || 0;
        const item = parseInt(this.form.querySelector('[name="ac_item"]')?.value) || 0;
        const level = parseInt(this.form.querySelector('[name="level"]')?.value) || 0;

        const total = 10 + dexMod + (prof > 0 ? level + prof : 0) + item;
        
        if (this.form.querySelector('[name="ac_dex"]')) {
            this.form.querySelector('[name="ac_dex"]').value = dexMod;
        }
        if (this.form.querySelector('[name="ac_total"]')) {
            this.form.querySelector('[name="ac_total"]').value = total;
        }
    }

    calculateSavingThrows() {
        const saves = {
            fortitude: 'constitution',
            reflex: 'dexterity',
            will: 'wisdom'
        };

        const level = parseInt(this.form.querySelector('[name="level"]')?.value) || 0;

        for (const [save, ability] of Object.entries(saves)) {
            const abilityMod = parseInt(this.form.querySelector(`[name="${ability}_mod"]`)?.value) || 0;
            const prof = parseInt(this.form.querySelector(`[name="${save}_save_prof"]`)?.value) || 0;
            const item = parseInt(this.form.querySelector(`[name="${save}_save_item"]`)?.value) || 0;

            const total = abilityMod + (prof > 0 ? level + prof : 0) + item;
            
            if (this.form.querySelector(`[name="${save}_save_mod"]`)) {
                this.form.querySelector(`[name="${save}_save_mod"]`).value = abilityMod;
            }
            if (this.form.querySelector(`[name="${save}_save_total"]`)) {
                this.form.querySelector(`[name="${save}_save_total"]`).value = total;
            }
        }
    }

    calculateSkills() {
        const skills = {
            acrobatics: 'dexterity',
            arcana: 'intelligence',
            athletics: 'strength',
            crafting: 'intelligence',
            deception: 'charisma',
            diplomacy: 'charisma',
            intimidation: 'charisma',
            medicine: 'wisdom',
            nature: 'wisdom',
            occultism: 'intelligence',
            performance: 'charisma',
            religion: 'wisdom',
            society: 'intelligence',
            stealth: 'dexterity',
            survival: 'wisdom',
            thievery: 'dexterity'
        };

        const level = parseInt(this.form.querySelector('[name="level"]')?.value) || 0;

        for (const [skill, ability] of Object.entries(skills)) {
            const abilityMod = parseInt(this.form.querySelector(`[name="${ability}_mod"]`)?.value) || 0;
            const prof = parseInt(this.form.querySelector(`[name="${skill}_prof"]`)?.value) || 0;
            const item = parseInt(this.form.querySelector(`[name="${skill}_item"]`)?.value) || 0;

            const total = abilityMod + (prof > 0 ? level + prof : 0) + item;
            
            if (this.form.querySelector(`[name="${skill}_mod"]`)) {
                this.form.querySelector(`[name="${skill}_mod"]`).value = abilityMod;
            }
            if (this.form.querySelector(`[name="${skill}_total"]`)) {
                this.form.querySelector(`[name="${skill}_total"]`).value = total;
            }
        }

        // Calculate Lore skills
        const loreSkills = this.form.querySelectorAll('.lore-skill');
        loreSkills.forEach((skill, index) => {
            const id = index === 0 ? '' : `_${index + 1}`;
            const abilityMod = parseInt(this.form.querySelector('[name="intelligence_mod"]')?.value) || 0;
            const prof = parseInt(skill.querySelector(`[name="lore${id}_prof"]`)?.value) || 0;
            const item = parseInt(skill.querySelector(`[name="lore${id}_item"]`)?.value) || 0;

            const total = abilityMod + (prof > 0 ? level + prof : 0) + item;
            
            if (skill.querySelector(`[name="lore${id}_mod"]`)) {
                skill.querySelector(`[name="lore${id}_mod"]`).value = abilityMod;
            }
            if (skill.querySelector(`[name="lore${id}_total"]`)) {
                skill.querySelector(`[name="lore${id}_total"]`).value = total;
            }
        });
    }

    calculateClassDC() {
        const keyAbility = this.form.querySelector('[name="classDcKeyAbility"]')?.value || 'charisma';
        const abilityMod = parseInt(this.form.querySelector(`[name="${keyAbility}_mod"]`)?.value) || 0;
        const prof = parseInt(this.form.querySelector('[name="classDcProf"]')?.value) || 0;
        const item = parseInt(this.form.querySelector('[name="classDcItem"]')?.value) || 0;
        const level = parseInt(this.form.querySelector('[name="level"]')?.value) || 0;

        const total = 10 + abilityMod + (prof > 0 ? level + prof : 0) + item;
        
        if (this.form.querySelector('[name="classDcTotal"]')) {
            this.form.querySelector('[name="classDcTotal"]').value = total;
        }
    }

    calculateStrikes() {
        const level = parseInt(this.form.querySelector('[name="level"]')?.value) || 0;
        const strMod = parseInt(this.form.querySelector('[name="strength_mod"]')?.value) || 0;
        const dexMod = parseInt(this.form.querySelector('[name="dexterity_mod"]')?.value) || 0;

        // Calculate melee strikes
        const meleeStrikes = this.form.querySelectorAll('.melee-strike');
        meleeStrikes.forEach((strike, index) => {
            const id = index === 0 ? '' : `_${index + 1}`;
            
            if (strike.querySelector(`[name="meleeStr${id}"]`)) {
                strike.querySelector(`[name="meleeStr${id}"]`).value = strMod;
            }
            if (strike.querySelector(`[name="meleeStrDmg${id}"]`)) {
                strike.querySelector(`[name="meleeStrDmg${id}"]`).value = strMod;
            }
            
            const prof = parseInt(strike.querySelector(`[name="meleeProf${id}"]`)?.value) || 0;
            const item = parseInt(strike.querySelector(`[name="meleeItem${id}"]`)?.value) || 0;
            const total = strMod + (prof > 0 ? level + prof : 0) + item;
            
            if (strike.querySelector(`[name="meleeTotal${id}"]`)) {
                strike.querySelector(`[name="meleeTotal${id}"]`).value = total;
            }
        });

        // Calculate ranged strikes
        const rangedStrikes = this.form.querySelectorAll('.ranged-strike');
        rangedStrikes.forEach((strike, index) => {
            const id = index === 0 ? '' : `_${index + 1}`;
            
            if (strike.querySelector(`[name="rangedDex${id}"]`)) {
                strike.querySelector(`[name="rangedDex${id}"]`).value = dexMod;
            }
            
            const prof = parseInt(strike.querySelector(`[name="rangedProf${id}"]`)?.value) || 0;
            const item = parseInt(strike.querySelector(`[name="rangedItem${id}"]`)?.value) || 0;
            const total = dexMod + (prof > 0 ? level + prof : 0) + item;
            
            if (strike.querySelector(`[name="rangedTotal${id}"]`)) {
                strike.querySelector(`[name="rangedTotal${id}"]`).value = total;
            }
        });
    }

    getAncestryBonuses(ancestry) {
        console.log('Getting ancestry bonuses for:', ancestry);
        const bonuses = {
            dwarf: { constitution: 2, wisdom: 2, charisma: -2 },
            elf: { dexterity: 2, intelligence: 2, constitution: -2 },
            gnome: { constitution: 2, charisma: 2, strength: -2 },
            goblin: { dexterity: 2, charisma: 2, wisdom: -2 },
            halfling: { dexterity: 2, wisdom: 2, strength: -2 },
            human: { strength: 2, dexterity: 2 },
            'half-elf': { dexterity: 2, charisma: 2 },
            'half-orc': { strength: 2, constitution: 2 },
            hobgoblin: { constitution: 2, intelligence: 2 },
            leshy: { constitution: 2, wisdom: 2, charisma: -2 },
            lizardfolk: { strength: 2, wisdom: 2 },
            orc: { strength: 2, constitution: 2, intelligence: -2 },
            ratfolk: { dexterity: 2, intelligence: 2, strength: -2 },
            tengu: { dexterity: 2, wisdom: 2 }
        };
        return bonuses[ancestry] || {};
    }

    getBackgroundBonuses(background) {
        console.log('Getting background bonuses for:', background);
        const bonuses = {
            acolyte: { intelligence: 2, wisdom: 2 },
            acrobat: { strength: 2, dexterity: 2 },
            'animal whisperer': { wisdom: 2, charisma: 2 },
            artisan: { strength: 2, intelligence: 2 },
            artist: { dexterity: 2, charisma: 2 },
            barkeep: { constitution: 2, charisma: 2 },
            'bounty hunter': { strength: 2, wisdom: 2 },
            criminal: { dexterity: 2, intelligence: 2 },
            detective: { intelligence: 2, wisdom: 2 },
            entertainer: { dexterity: 2, charisma: 2 },
            farmhand: { constitution: 2, wisdom: 2 },
            gladiator: { strength: 2, charisma: 2 },
            guard: { strength: 2, constitution: 2 },
            herbalist: { constitution: 2, wisdom: 2 },
            hermit: { constitution: 2, intelligence: 2 },
            hunter: { dexterity: 2, wisdom: 2 },
            laborer: { strength: 2, constitution: 2 },
            merchant: { intelligence: 2, charisma: 2 },
            noble: { intelligence: 2, charisma: 2 },
            nomad: { constitution: 2, wisdom: 2 },
            scholar: { intelligence: 2, wisdom: 2 },
            scout: { dexterity: 2, wisdom: 2 },
            'street urchin': { dexterity: 2, constitution: 2 },
            warrior: { strength: 2, constitution: 2 }
        };
        return bonuses[background] || {};
    }

    getClassBonuses(characterClass) {
        console.log('Getting class bonuses for:', characterClass);
        const bonuses = {
            alchemist: { intelligence: 2 },
            barbarian: { strength: 2 },
            bard: { charisma: 2 },
            champion: { strength: 2 },
            cleric: { wisdom: 2 },
            druid: { wisdom: 2 },
            fighter: { strength: 2 },
            gunslinger: { dexterity: 2 },
            inventor: { intelligence: 2 },
            investigator: { intelligence: 2 },
            magus: { intelligence: 2 },
            monk: { dexterity: 2 },
            oracle: { charisma: 2 },
            ranger: { dexterity: 2 },
            rogue: { dexterity: 2 },
            sorcerer: { charisma: 2 },
            summoner: { charisma: 2 },
            swashbuckler: { dexterity: 2 },
            witch: { intelligence: 2 },
            wizard: { intelligence: 2 }
        };
        return bonuses[characterClass] || {};
    }
}

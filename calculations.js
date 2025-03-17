export class CharacterCalculator {
    constructor() {
        // Nie ustawiamy event listenerów w konstruktorze
    }

    setupEventListeners() {
        // Ability score event listeners
        document.querySelectorAll('.base-ability')?.forEach(input => {
            input?.addEventListener('change', () => this.updateAbilityScores());
        });

        // AC event listeners
        document.querySelectorAll('[name="baseAC"], [name="dexCap"], [name="acItemBonus"]')?.forEach(input => {
            input?.addEventListener('change', () => this.calculateAC());
        });

        // Level change listener
        const levelInput = document.querySelector('[name="level"]');
        levelInput?.addEventListener('change', () => {
            this.calculateSavingThrows();
            this.calculateSkills();
        });

        // Skill proficiency and item bonus listeners
        const skillInputs = document.querySelectorAll('[name$="Proficiency"], [name$="ItemBonus"]');
        skillInputs?.forEach(input => {
            input?.addEventListener('change', () => this.calculateSkills());
        });
    }

    getAncestryBonuses(ancestry) {
        const bonuses = {
            'dwarf': { constitution: 2, wisdom: 2, charisma: -2 },
            'elf': { dexterity: 2, intelligence: 2, constitution: -2 },
            'gnome': { constitution: 2, charisma: 2, strength: -2 },
            'goblin': { dexterity: 2, charisma: 2, wisdom: -2 },
            'halfling': { dexterity: 2, wisdom: 2, strength: -2 },
            'human': { strength: 2 },
            'half-elf': { dexterity: 2 },
            'half-orc': { strength: 2 },
            'hobgoblin': { constitution: 2 },
            'lesh': { constitution: 2, wisdom: 2, intelligence: -2 },
            'lizardfolk': { strength: 2, wisdom: 2, intelligence: -2 },
            'orc': { strength: 2, constitution: 2, intelligence: -2 },
            'ratfolk': { dexterity: 2, intelligence: 2, strength: -2 },
            'tengu': { dexterity: 2, charisma: 2, constitution: -2 }
        };
        return bonuses[ancestry] || {};
    }

    getBackgroundBonuses(background) {
        const bonuses = {
            'acolyte': { wisdom: 2, intelligence: 2 },
            'acrobat': { dexterity: 2, charisma: 2 },
            'animal whisperer': { wisdom: 2, charisma: 2 },
            'artisan': { strength: 2, intelligence: 2 },
            'artist': { dexterity: 2, charisma: 2 },
            'barkeep': { constitution: 2, charisma: 2 },
            'bounty hunter': { strength: 2, wisdom: 2 },
            'criminal': { dexterity: 2, intelligence: 2 },
            'detective': { intelligence: 2, wisdom: 2 },
            'entertainer': { dexterity: 2, charisma: 2 },
            'farmhand': { constitution: 2, wisdom: 2 },
            'gladiator': { strength: 2, charisma: 2 },
            'guard': { strength: 2, charisma: 2 },
            'herbalist': { constitution: 2, wisdom: 2 },
            'hermit': { constitution: 2, intelligence: 2 },
            'hunter': { dexterity: 2, wisdom: 2 },
            'laborer': { strength: 2, constitution: 2 },
            'merchant': { intelligence: 2, charisma: 2 },
            'noble': { intelligence: 2, charisma: 2 },
            'nomad': { constitution: 2, wisdom: 2 },
            'scholar': { intelligence: 2, wisdom: 2 },
            'scout': { dexterity: 2, wisdom: 2 },
            'street urchin': { dexterity: 2, constitution: 2 },
            'warrior': { strength: 2, constitution: 2 }
        };
        return bonuses[background] || {};
    }

    getClassBonuses(characterClass) {
        const bonuses = {
            'alchemist': { intelligence: 2 },
            'barbarian': { strength: 2 },
            'bard': { charisma: 2 },
            'champion': { strength: 2 },
            'cleric': { wisdom: 2 },
            'druid': { wisdom: 2 },
            'fighter': { strength: 2 },
            'gunslinger': { dexterity: 2 },
            'inventor': { intelligence: 2 },
            'investigator': { intelligence: 2 },
            'magus': { intelligence: 2 },
            'monk': { dexterity: 2 },
            'oracle': { charisma: 2 },
            'ranger': { dexterity: 2 },
            'rogue': { dexterity: 2 },
            'sorcerer': { charisma: 2 },
            'summoner': { charisma: 2 },
            'swashbuckler': { dexterity: 2 },
            'witch': { intelligence: 2 },
            'wizard': { intelligence: 2 }
        };
        return bonuses[characterClass] || {};
    }

    updateAbilityScores() {
        const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
        
        abilities.forEach(ability => {
            const baseInput = document.querySelector(`[name="${ability}"]`);
            const totalInput = document.querySelector(`[data-ability="${ability}"].total-ability`);
            
            if (baseInput && totalInput) {
                const base = parseInt(baseInput.value) || 10;
                const ancestryBonus = parseInt(document.querySelector(`[data-ability="${ability}"].ancestry-bonus`)?.value) || 0;
                const backgroundBonus = parseInt(document.querySelector(`[data-ability="${ability}"].background-bonus`)?.value) || 0;
                const classBonus = parseInt(document.querySelector(`[data-ability="${ability}"].class-bonus`)?.value) || 0;
                
                const total = base + ancestryBonus + backgroundBonus + classBonus;
                totalInput.value = total;
                
                // Update modifier display
                const modifier = Math.floor((total - 10) / 2);
                const modifierClass = modifier >= 0 ? 'bonus-positive' : 'bonus-negative';
                totalInput.classList.remove('bonus-positive', 'bonus-negative');
                totalInput.classList.add(modifierClass);
            }
        });

        this.calculateAC();
        this.calculateSavingThrows();
        this.calculateSkills();
    }

    calculateAC() {
        const baseAC = parseInt(document.querySelector('[name="baseAC"]')?.value) || 10;
        const dexCap = parseInt(document.querySelector('[name="dexCap"]')?.value) || 0;
        const itemBonus = parseInt(document.querySelector('[name="acItemBonus"]')?.value) || 0;
        
        const dexMod = parseInt(document.querySelector('[data-ability="dexterity"].total-ability')?.value) || 0;
        const effectiveDexMod = dexCap > 0 ? Math.min(dexMod, dexCap) : dexMod;
        
        const totalAC = baseAC + effectiveDexMod + itemBonus;
        const totalACInput = document.querySelector('[name="totalAC"]');
        if (totalACInput) {
            totalACInput.value = totalAC;
        }
    }

    calculateSavingThrows() {
        const level = parseInt(document.querySelector('[name="level"]')?.value) || 0;
        
        // Calculate Fortitude save
        const conMod = Math.floor((parseInt(document.querySelector('[data-ability="constitution"].total-ability')?.value) - 10) / 2);
        const fortProf = parseInt(document.querySelector('[name="fortitudeProf"]')?.value) || 0;
        const fortItem = parseInt(document.querySelector('[name="fortitudeItem"]')?.value) || 0;
        const fortTotal = document.querySelector('[name="fortitudeTotal"]');
        if (fortTotal) {
            fortTotal.value = fortProf + fortItem + conMod + level;
        }
        
        // Calculate Reflex save
        const dexMod = Math.floor((parseInt(document.querySelector('[data-ability="dexterity"].total-ability')?.value) - 10) / 2);
        const reflexProf = parseInt(document.querySelector('[name="reflexProf"]')?.value) || 0;
        const reflexItem = parseInt(document.querySelector('[name="reflexItem"]')?.value) || 0;
        const reflexTotal = document.querySelector('[name="reflexTotal"]');
        if (reflexTotal) {
            reflexTotal.value = reflexProf + reflexItem + dexMod + level;
        }
        
        // Calculate Will save
        const wisMod = Math.floor((parseInt(document.querySelector('[data-ability="wisdom"].total-ability')?.value) - 10) / 2);
        const willProf = parseInt(document.querySelector('[name="willProf"]')?.value) || 0;
        const willItem = parseInt(document.querySelector('[name="willItem"]')?.value) || 0;
        const willTotal = document.querySelector('[name="willTotal"]');
        if (willTotal) {
            willTotal.value = willProf + willItem + wisMod + level;
        }
    }

    calculateSkills() {
        const level = parseInt(document.querySelector('[name="level"]')?.value) || 0;
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

        Object.entries(skills).forEach(([skill, ability]) => {
            const profValue = parseInt(document.querySelector(`[name="${skill}Proficiency"]`)?.value) || 0;
            const itemBonus = parseInt(document.querySelector(`[name="${skill}ItemBonus"]`)?.value) || 0;
            const abilityScore = parseInt(document.querySelector(`[data-ability="${ability}"].total-ability`)?.value) || 10;
            const abilityMod = Math.floor((abilityScore - 10) / 2);
            
            // Update ability modifier display
            const abilityModInput = document.querySelector(`[name="${skill}AbilityMod"]`);
            if (abilityModInput) {
                abilityModInput.value = abilityMod;
            }
            
            // Update total
            const totalInput = document.querySelector(`[name="${skill}Total"]`);
            if (totalInput) {
                totalInput.value = profValue + itemBonus + abilityMod + level;
            }
        });
    }
}

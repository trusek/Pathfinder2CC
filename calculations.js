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
    }

    getAncestryBonuses(ancestry) {
        const bonuses = {
            'Dwarf': { constitution: 2, wisdom: 2, charisma: -2 },
            'Elf': { dexterity: 2, intelligence: 2, constitution: -2 },
            'Gnome': { constitution: 2, charisma: 2, strength: -2 },
            'Goblin': { dexterity: 2, charisma: 2, wisdom: -2 },
            'Halfling': { dexterity: 2, wisdom: 2, strength: -2 },
            'Human': { strength: 2 },
            'Half-Elf': { dexterity: 2 },
            'Half-Orc': { strength: 2 },
            'Hobgoblin': { constitution: 2 },
            'Leshy': { constitution: 2, wisdom: 2, intelligence: -2 },
            'Lizardfolk': { strength: 2, wisdom: 2, intelligence: -2 },
            'Orc': { strength: 2, constitution: 2, intelligence: -2 },
            'Ratfolk': { dexterity: 2, intelligence: 2, strength: -2 },
            'Tengu': { dexterity: 2, charisma: 2, constitution: -2 }
        };
        return bonuses[ancestry] || {};
    }

    getBackgroundBonuses(background) {
        const bonuses = {
            'Acolyte': { wisdom: 2, intelligence: 2 },
            'Acrobat': { dexterity: 2, charisma: 2 },
            'Animal Whisperer': { wisdom: 2, charisma: 2 },
            'Artisan': { strength: 2, intelligence: 2 },
            'Artist': { dexterity: 2, charisma: 2 },
            'Barkeep': { constitution: 2, charisma: 2 },
            'Bounty Hunter': { strength: 2, wisdom: 2 },
            'Criminal': { dexterity: 2, intelligence: 2 },
            'Detective': { intelligence: 2, wisdom: 2 },
            'Entertainer': { dexterity: 2, charisma: 2 },
            'Farmhand': { constitution: 2, wisdom: 2 },
            'Gladiator': { strength: 2, charisma: 2 },
            'Guard': { strength: 2, charisma: 2 },
            'Herbalist': { constitution: 2, wisdom: 2 },
            'Hermit': { constitution: 2, intelligence: 2 },
            'Hunter': { dexterity: 2, wisdom: 2 },
            'Laborer': { strength: 2, constitution: 2 },
            'Merchant': { intelligence: 2, charisma: 2 },
            'Noble': { intelligence: 2, charisma: 2 },
            'Nomad': { constitution: 2, wisdom: 2 },
            'Scholar': { intelligence: 2, wisdom: 2 },
            'Scout': { dexterity: 2, wisdom: 2 },
            'Street Urchin': { dexterity: 2, constitution: 2 },
            'Warrior': { strength: 2, constitution: 2 }
        };
        return bonuses[background] || {};
    }

    getClassBonuses(characterClass) {
        const bonuses = {
            'Alchemist': { intelligence: 2 },
            'Barbarian': { strength: 2 },
            'Bard': { charisma: 2 },
            'Champion': { strength: 2 },
            'Cleric': { wisdom: 2 },
            'Druid': { wisdom: 2 },
            'Fighter': { strength: 2 },
            'Gunslinger': { dexterity: 2 },
            'Inventor': { intelligence: 2 },
            'Investigator': { intelligence: 2 },
            'Magus': { intelligence: 2 },
            'Monk': { dexterity: 2 },
            'Oracle': { charisma: 2 },
            'Ranger': { dexterity: 2 },
            'Rogue': { dexterity: 2 },
            'Sorcerer': { charisma: 2 },
            'Summoner': { charisma: 2 },
            'Swashbuckler': { dexterity: 2 },
            'Witch': { intelligence: 2 },
            'Wizard': { intelligence: 2 }
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
            const profValue = parseInt(document.querySelector(`[name="${skill}Prof"]`)?.value) || 0;
            const itemBonus = parseInt(document.querySelector(`[name="${skill}Item"]`)?.value) || 0;
            const abilityMod = Math.floor((parseInt(document.querySelector(`[data-ability="${ability}"].total-ability`)?.value) - 10) / 2);
            
            const total = profValue + itemBonus + abilityMod + level;
            const totalInput = document.querySelector(`[name="${skill}Total"]`);
            if (totalInput) {
                totalInput.value = total;
            }
        });
    }
}

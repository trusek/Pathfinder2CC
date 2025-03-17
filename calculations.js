export class CharacterCalculator {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Ability score event listeners
        document.querySelectorAll('.base-ability').forEach(input => {
            input.addEventListener('change', () => this.updateAbilityScores());
        });

        // AC event listeners
        document.querySelectorAll('[name="baseAC"], [name="dexCap"], [name="acItemBonus"]').forEach(input => {
            input.addEventListener('change', () => this.calculateAC());
        });

        // Level change listener
        document.querySelector('[name="level"]').addEventListener('change', () => {
            this.calculateSavingThrows();
            this.calculateSkills();
        });
    }

    updateAbilityScores() {
        const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
        
        abilities.forEach(ability => {
            const baseInput = document.querySelector(`[name="${ability}"]`);
            const totalInput = document.querySelector(`[data-ability="${ability}"].total-ability`);
            
            if (baseInput && totalInput) {
                const base = parseInt(baseInput.value) || 10;
                const ancestryBonus = parseInt(document.querySelector(`[data-ability="${ability}"].ancestry-bonus`).value) || 0;
                const backgroundBonus = parseInt(document.querySelector(`[data-ability="${ability}"].background-bonus`).value) || 0;
                const classBonus = parseInt(document.querySelector(`[data-ability="${ability}"].class-bonus`).value) || 0;
                
                const total = base + ancestryBonus + backgroundBonus + classBonus;
                totalInput.value = total;
                
                // Update modifier display
                const modifier = Math.floor((total - 10) / 2);
                const modifierClass = modifier >= 0 ? 'bonus-positive' : 'bonus-negative';
                totalInput.classList.remove('bonus-positive', 'bonus-negative');
                totalInput.classList.add(modifierClass);
            }
        });
    }

    calculateAC() {
        const baseAC = parseInt(document.querySelector('[name="baseAC"]').value) || 10;
        const dexCap = parseInt(document.querySelector('[name="dexCap"]').value) || 0;
        const itemBonus = parseInt(document.querySelector('[name="acItemBonus"]').value) || 0;
        
        const dexMod = parseInt(document.querySelector('[data-ability="dexterity"].total-ability').value) || 0;
        const effectiveDexMod = dexCap > 0 ? Math.min(dexMod, dexCap) : dexMod;
        
        const totalAC = baseAC + effectiveDexMod + itemBonus;
        document.querySelector('[name="totalAC"]').value = totalAC;
    }

    calculateSavingThrows() {
        const level = parseInt(document.querySelector('[name="level"]').value) || 0;
        
        // Calculate Fortitude save
        const conMod = Math.floor((parseInt(document.querySelector('[data-ability="constitution"].total-ability').value) - 10) / 2);
        const fortProf = parseInt(document.querySelector('[name="fortitudeProf"]').value) || 0;
        const fortItem = parseInt(document.querySelector('[name="fortitudeItem"]').value) || 0;
        document.querySelector('[name="fortitudeTotal"]').value = fortProf + fortItem + conMod + level;
        
        // Calculate Reflex save
        const dexMod = Math.floor((parseInt(document.querySelector('[data-ability="dexterity"].total-ability').value) - 10) / 2);
        const reflexProf = parseInt(document.querySelector('[name="reflexProf"]').value) || 0;
        const reflexItem = parseInt(document.querySelector('[name="reflexItem"]').value) || 0;
        document.querySelector('[name="reflexTotal"]').value = reflexProf + reflexItem + dexMod + level;
        
        // Calculate Will save
        const wisMod = Math.floor((parseInt(document.querySelector('[data-ability="wisdom"].total-ability').value) - 10) / 2);
        const willProf = parseInt(document.querySelector('[name="willProf"]').value) || 0;
        const willItem = parseInt(document.querySelector('[name="willItem"]').value) || 0;
        document.querySelector('[name="willTotal"]').value = willProf + willItem + wisMod + level;
    }

    calculateSkills() {
        const level = parseInt(document.querySelector('[name="level"]').value) || 0;
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
            const abilityMod = Math.floor((parseInt(document.querySelector(`[data-ability="${ability}"].total-ability`).value) - 10) / 2);
            
            const total = profValue + itemBonus + abilityMod + level;
            const totalInput = document.querySelector(`[name="${skill}Total"]`);
            if (totalInput) {
                totalInput.value = total;
            }
        });
    }
}

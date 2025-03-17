import { basicInfoTemplate, combatTemplate, skillsTemplate, featsTemplate } from './templates.js';
import { FormHandler } from './formHandlers.js';
import { CharacterCalculator } from './calculations.js';
import { FeatsHandler } from './featsHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize form content
    const characterForm = document.getElementById('characterForm');
    if (characterForm) {
        characterForm.innerHTML = `
            <div class="tab-content">
                ${basicInfoTemplate}
                ${combatTemplate}
                ${skillsTemplate}
                ${featsTemplate}
                <div class="tab-pane fade" id="spells">
                    <!-- Spells content will be added in next update -->
                </div>
                <div class="tab-pane fade" id="inventory">
                    <!-- Inventory content will be added in next update -->
                </div>
                <div class="tab-pane fade" id="character">
                    <!-- Character content will be added in next update -->
                </div>
            </div>
        `;
    }

    // Initialize handlers
    const formHandler = new FormHandler();
    const calculator = new CharacterCalculator();
    const featsHandler = new FeatsHandler();

    // Make some functions globally available (needed for form handler)
    window.updateAbilityScores = () => calculator.updateAbilityScores();
    window.calculateAC = () => calculator.calculateAC();
    window.calculateSavingThrows = () => calculator.calculateSavingThrows();
    window.calculateSkills = () => calculator.calculateSkills();
    window.addFeat = (type) => featsHandler.addFeat(type);
    window.addFeature = () => featsHandler.addFeature();

    // Initialize Bootstrap tabs
    const triggerTabList = document.querySelectorAll('#characterTabs button');
    triggerTabList.forEach(triggerEl => {
        new bootstrap.Tab(triggerEl);
    });

    // Get form elements
    const saveBtn = document.getElementById('saveBtn');
    const loadBtn = document.getElementById('loadBtn');
    const exportBtn = document.getElementById('exportBtn');
    const importBtn = document.getElementById('importBtn');
    const importFile = document.getElementById('importFile');

    // Add event listeners for ability score updates
    const baseAbilityInputs = document.querySelectorAll('.base-ability');
    baseAbilityInputs.forEach(input => {
        input.addEventListener('change', updateAbilityScores);
    });

    // Add event listeners for ancestry, background, and class selection
    const ancestrySelect = document.querySelector('select[name="ancestry"]');
    const backgroundSelect = document.querySelector('select[name="background"]');
    const classSelect = document.querySelector('select[name="class"]');

    ancestrySelect.addEventListener('change', updateAbilityScores);
    backgroundSelect.addEventListener('change', updateAbilityScores);
    classSelect.addEventListener('change', updateAbilityScores);

    // Add event listeners for combat calculations
    const baseACInput = document.querySelector('input[name="baseAC"]');
    const dexCapInput = document.querySelector('input[name="dexCap"]');
    const acItemBonusInput = document.querySelector('input[name="acItemBonus"]');
    const totalACInput = document.querySelector('input[name="totalAC"]');

    [baseACInput, dexCapInput, acItemBonusInput].forEach(input => {
        input.addEventListener('change', calculateAC);
    });

    // Add event listeners for saving throw calculations
    const savingThrowInputs = document.querySelectorAll('input[name$="Prof"], input[name$="Item"]');
    savingThrowInputs.forEach(input => {
        input.addEventListener('change', calculateSavingThrows);
    });

    // Add event listeners for skill calculations
    const skillInputs = document.querySelectorAll('select[name$="Prof"], input[name$="Item"]');
    skillInputs.forEach(input => {
        input.addEventListener('change', calculateSkills);
    });

    // Add event listener for level changes
    const levelInput = document.querySelector('input[name="level"]');
    levelInput.addEventListener('change', () => {
        calculateSkills();
        calculateSavingThrows();
    });

    // Add event listeners for feat management
    const addAncestryFeatBtn = document.getElementById('addAncestryFeat');
    const addClassFeatBtn = document.getElementById('addClassFeat');
    const addSkillFeatBtn = document.getElementById('addSkillFeat');
    const addGeneralFeatBtn = document.getElementById('addGeneralFeat');
    const addClassFeatureBtn = document.getElementById('addClassFeature');

    addAncestryFeatBtn.addEventListener('click', () => addFeat('ancestry'));
    addClassFeatBtn.addEventListener('click', () => addFeat('class'));
    addSkillFeatBtn.addEventListener('click', () => addFeat('skill'));
    addGeneralFeatBtn.addEventListener('click', () => addFeat('general'));
    addClassFeatureBtn.addEventListener('click', () => addFeature());

    // Save character data
    saveBtn.addEventListener('click', () => {
        const formData = new FormData(characterForm);
        const characterData = Object.fromEntries(formData.entries());
        const featsData = featsHandler.getFeatsData();
        
        const fullData = {
            ...characterData,
            feats: featsData
        };
        
        localStorage.setItem('characterData', JSON.stringify(fullData));
        alert('Character data saved!');
    });

    // Load character data
    loadBtn.addEventListener('click', () => {
        const savedData = localStorage.getItem('characterData');
        if (savedData) {
            const fullData = JSON.parse(savedData);
            const { feats, ...characterData } = fullData;
            
            // Load basic character data
            Object.entries(characterData).forEach(([name, value]) => {
                const input = characterForm.querySelector(`[name="${name}"]`);
                if (input) {
                    input.value = value;
                }
            });
            
            // Load feats and features
            if (feats) {
                featsHandler.loadFeatsData(feats);
            }
            
            updateAbilityScores();
            calculateAC();
            calculateSavingThrows();
            calculateSkills();
            alert('Character data loaded!');
        } else {
            alert('No saved character data found.');
        }
    });

    // Export character data
    exportBtn.addEventListener('click', () => {
        const formData = new FormData(characterForm);
        const characterData = Object.fromEntries(formData.entries());
        const featsData = featsHandler.getFeatsData();
        const dataStr = JSON.stringify({ ...characterData, feats: featsData }, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = 'character.json';

        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    });

    // Import character data
    importBtn.addEventListener('click', () => {
        importFile.click();
    });

    importFile.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const fullData = JSON.parse(e.target.result);
                    const { feats, ...characterData } = fullData;
                    
                    // Load basic character data
                    Object.entries(characterData).forEach(([name, value]) => {
                        const input = characterForm.querySelector(`[name="${name}"]`);
                        if (input) {
                            input.value = value;
                        }
                    });
                    
                    // Load feats and features
                    if (feats) {
                        featsHandler.loadFeatsData(feats);
                    }
                    
                    updateAbilityScores();
                    calculateAC();
                    calculateSavingThrows();
                    calculateSkills();
                    alert('Character data imported successfully!');
                } catch (error) {
                    alert('Error importing character data: Invalid JSON file');
                }
            };
            reader.readAsText(file);
        }
    });

    // Function to update ability scores based on ancestry, background, and class
    function updateAbilityScores() {
        const abilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
        const ancestry = ancestrySelect.value;
        const background = backgroundSelect.value;
        const characterClass = classSelect.value;

        // Reset all bonuses
        abilities.forEach(ability => {
            document.querySelector(`[data-ability="${ability}"].ancestry-bonus`).value = 0;
            document.querySelector(`[data-ability="${ability}"].background-bonus`).value = 0;
            document.querySelector(`[data-ability="${ability}"].class-bonus`).value = 0;
        });

        // Apply ancestry bonuses (example values)
        if (ancestry) {
            const ancestryBonuses = calculator.getAncestryBonuses(ancestry);
            Object.entries(ancestryBonuses).forEach(([ability, bonus]) => {
                const bonusInput = document.querySelector(`[data-ability="${ability}"].ancestry-bonus`);
                if (bonusInput) {
                    bonusInput.value = bonus;
                    applyBonusStyle(bonusInput, bonus);
                }
            });
        }

        // Apply background bonuses (example values)
        if (background) {
            const backgroundBonuses = calculator.getBackgroundBonuses(background);
            Object.entries(backgroundBonuses).forEach(([ability, bonus]) => {
                const bonusInput = document.querySelector(`[data-ability="${ability}"].background-bonus`);
                if (bonusInput) {
                    bonusInput.value = bonus;
                    applyBonusStyle(bonusInput, bonus);
                }
            });
        }

        // Apply class bonuses (example values)
        if (characterClass) {
            const classBonuses = calculator.getClassBonuses(characterClass);
            Object.entries(classBonuses).forEach(([ability, bonus]) => {
                const bonusInput = document.querySelector(`[data-ability="${ability}"].class-bonus`);
                if (bonusInput) {
                    bonusInput.value = bonus;
                    applyBonusStyle(bonusInput, bonus);
                }
            });
        }

        // Calculate total scores
        abilities.forEach(ability => {
            const baseValue = parseInt(document.querySelector(`[data-ability="${ability}"].base-ability`).value) || 0;
            const ancestryBonus = parseInt(document.querySelector(`[data-ability="${ability}"].ancestry-bonus`).value) || 0;
            const backgroundBonus = parseInt(document.querySelector(`[data-ability="${ability}"].background-bonus`).value) || 0;
            const classBonus = parseInt(document.querySelector(`[data-ability="${ability}"].class-bonus`).value) || 0;
            const total = baseValue + ancestryBonus + backgroundBonus + classBonus;
            
            document.querySelector(`[data-ability="${ability}"].total-ability`).value = total;
        });

        // Recalculate dependent values
        calculateAC();
        calculateSavingThrows();
        calculateSkills();
    }

    // Function to calculate Armor Class
    function calculateAC() {
        const baseAC = parseInt(baseACInput.value) || 10;
        const dexMod = parseInt(document.querySelector('[data-ability="dexterity"].total-ability').value) || 0;
        const dexCap = parseInt(dexCapInput.value) || 0;
        const itemBonus = parseInt(acItemBonusInput.value) || 0;

        const effectiveDexMod = dexCap > 0 ? Math.min(dexMod, dexCap) : dexMod;
        const totalAC = baseAC + effectiveDexMod + itemBonus;

        totalACInput.value = totalAC;
    }

    // Function to calculate Saving Throws
    function calculateSavingThrows() {
        const saves = ['fortitude', 'reflex', 'will'];
        const abilityMods = {
            fortitude: parseInt(document.querySelector('[data-ability="constitution"].total-ability').value) || 0,
            reflex: parseInt(document.querySelector('[data-ability="dexterity"].total-ability').value) || 0,
            will: parseInt(document.querySelector('[data-ability="wisdom"].total-ability').value) || 0
        };

        saves.forEach(save => {
            const profBonus = parseInt(document.querySelector(`input[name="${save}Prof"]`).value) || 0;
            const itemBonus = parseInt(document.querySelector(`input[name="${save}Item"]`).value) || 0;
            const abilityMod = abilityMods[save];
            
            const total = profBonus + itemBonus + abilityMod;
            document.querySelector(`input[name="${save}Total"]`).value = total;
        });
    }

    // Function to calculate Skills
    function calculateSkills() {
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

        const level = parseInt(document.querySelector('input[name="level"]').value) || 0;

        Object.entries(skills).forEach(([skill, ability]) => {
            const profValue = parseInt(document.querySelector(`select[name="${skill}Prof"]`).value) || 0;
            const itemBonus = parseInt(document.querySelector(`input[name="${skill}Item"]`).value) || 0;
            const abilityMod = parseInt(document.querySelector(`[data-ability="${ability}"].total-ability`).value) || 0;
            
            // W Pathfinder 2E, bonus z biegłości to poziom postaci + wartość biegłości
            const profBonus = profValue > 0 ? level + profValue : 0;
            const total = profBonus + itemBonus + abilityMod;
            
            document.querySelector(`input[name="${skill}Total"]`).value = total;
        });
    }

    // Helper function to apply bonus styling
    function applyBonusStyle(element, value) {
        element.classList.remove('bonus-positive', 'bonus-negative');
        if (value > 0) {
            element.classList.add('bonus-positive');
        } else if (value < 0) {
            element.classList.add('bonus-negative');
        }
    }
});

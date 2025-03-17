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
    const addAncestryFeatBtn = document.getElementById('addAncestryFeat');
    const addClassFeatBtn = document.getElementById('addClassFeat');
    const addSkillFeatBtn = document.getElementById('addSkillFeat');
    const addGeneralFeatBtn = document.getElementById('addGeneralFeat');
    const addClassFeatureBtn = document.getElementById('addClassFeature');

    // Add event listeners for feat buttons
    if (addAncestryFeatBtn) addAncestryFeatBtn.addEventListener('click', () => featsHandler.addFeat('ancestry'));
    if (addClassFeatBtn) addClassFeatBtn.addEventListener('click', () => featsHandler.addFeat('class'));
    if (addSkillFeatBtn) addSkillFeatBtn.addEventListener('click', () => featsHandler.addFeat('skill'));
    if (addGeneralFeatBtn) addGeneralFeatBtn.addEventListener('click', () => featsHandler.addFeat('general'));
    if (addClassFeatureBtn) addClassFeatureBtn.addEventListener('click', () => featsHandler.addFeature());

    // Save character data
    if (saveBtn) {
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
    }

    // Load character data
    if (loadBtn) {
        loadBtn.addEventListener('click', () => {
            const savedData = localStorage.getItem('characterData');
            if (savedData) {
                const fullData = JSON.parse(savedData);
                const { feats, ...characterData } = fullData;
                
                // Load basic data
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
                
                calculator.updateAbilityScores();
                calculator.calculateAC();
                calculator.calculateSavingThrows();
                calculator.calculateSkills();
                alert('Character data loaded!');
            } else {
                alert('No saved character data found.');
            }
        });
    }

    // Export character data
    if (exportBtn) {
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
    }

    // Import character data
    if (importBtn && importFile) {
        importBtn.addEventListener('click', () => importFile.click());
        importFile.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const fullData = JSON.parse(e.target.result);
                        const { feats, ...characterData } = fullData;
                        
                        // Load basic data
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
                        
                        calculator.updateAbilityScores();
                        calculator.calculateAC();
                        calculator.calculateSavingThrows();
                        calculator.calculateSkills();
                        alert('Character data imported successfully!');
                    } catch (error) {
                        alert('Error importing character data: ' + error.message);
                    }
                };
                reader.readAsText(file);
            }
        });
    }

    // Add event listeners for ability score changes
    document.querySelectorAll('.base-ability').forEach(input => {
        input.addEventListener('change', () => calculator.updateAbilityScores());
    });

    // Add event listeners for AC changes
    document.querySelectorAll('[name="baseAC"], [name="dexCap"], [name="acItemBonus"]').forEach(input => {
        input.addEventListener('change', () => calculator.calculateAC());
    });

    // Add event listener for level changes
    const levelInput = document.querySelector('[name="level"]');
    if (levelInput) {
        levelInput.addEventListener('change', () => {
            calculator.calculateSavingThrows();
            calculator.calculateSkills();
        });
    }

    // Add event listeners for ancestry, background, and class changes
    const ancestrySelect = document.querySelector('[name="ancestry"]');
    const backgroundSelect = document.querySelector('[name="background"]');
    const classSelect = document.querySelector('[name="class"]');

    if (ancestrySelect) {
        ancestrySelect.addEventListener('change', () => {
            const ancestry = ancestrySelect.value;
            if (ancestry) {
                const ancestryBonuses = calculator.getAncestryBonuses(ancestry);
                Object.entries(ancestryBonuses).forEach(([ability, bonus]) => {
                    const bonusInput = document.querySelector(`[data-ability="${ability}"].ancestry-bonus`);
                    if (bonusInput) {
                        bonusInput.value = bonus;
                    }
                });
                calculator.updateAbilityScores();
            }
        });
    }

    if (backgroundSelect) {
        backgroundSelect.addEventListener('change', () => {
            const background = backgroundSelect.value;
            if (background) {
                const backgroundBonuses = calculator.getBackgroundBonuses(background);
                Object.entries(backgroundBonuses).forEach(([ability, bonus]) => {
                    const bonusInput = document.querySelector(`[data-ability="${ability}"].background-bonus`);
                    if (bonusInput) {
                        bonusInput.value = bonus;
                    }
                });
                calculator.updateAbilityScores();
            }
        });
    }

    if (classSelect) {
        classSelect.addEventListener('change', () => {
            const characterClass = classSelect.value;
            if (characterClass) {
                const classBonuses = calculator.getClassBonuses(characterClass);
                Object.entries(classBonuses).forEach(([ability, bonus]) => {
                    const bonusInput = document.querySelector(`[data-ability="${ability}"].class-bonus`);
                    if (bonusInput) {
                        bonusInput.value = bonus;
                    }
                });
                calculator.updateAbilityScores();
            }
        });
    }
});

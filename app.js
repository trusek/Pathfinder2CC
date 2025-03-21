import { basicInfoTemplate, combatTemplate, skillsTemplate, featsTemplate, characterTemplate, spellsTemplate, inventoryTemplate } from './templates/index.js';
import { FormHandler } from './formHandlers.js';
import { CharacterCalculator } from './calculations.js';
import { FeatsHandler } from './featsHandler.js';
import { SpellsHandler } from './spellsHandler.js';
import { InventoryHandler } from './inventoryHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    
    const form = document.getElementById('characterForm');
    if (!form) {
        console.error('Character form not found!');
        return;
    }

    // Initialize form content
    form.innerHTML = `
        <div class="tab-content">
            ${basicInfoTemplate}
            ${combatTemplate}
            ${skillsTemplate}
            ${featsTemplate}
            ${characterTemplate}
            ${spellsTemplate}
            ${inventoryTemplate}
        </div>
    `;

    // Initialize handlers
    const formHandler = new FormHandler();
    const calculator = new CharacterCalculator(form);
    const featsHandler = new FeatsHandler();
    const spellsHandler = new SpellsHandler();
    const inventoryHandler = new InventoryHandler();

    // Make some functions globally available (needed for form handler)
    window.updateAbilityScores = () => calculator.updateAbilityScores();
    window.calculateAC = () => calculator.calculateAC();
    window.calculateSavingThrows = () => calculator.calculateSavingThrows();
    window.calculateSkills = () => calculator.calculateSkills();
    window.addFeat = (type) => featsHandler.addFeat(type);
    window.addFeature = () => featsHandler.addFeature();
    window.addSpell = () => spellsHandler.addSpell();
    window.removeSpell = (id) => spellsHandler.removeSpell(id);
    window.addItem = () => inventoryHandler.addItem();
    window.removeItem = (id) => inventoryHandler.removeItem(id);
    window.moveItem = (id, category) => inventoryHandler.moveItem(id, category);

    // Initialize Bootstrap tabs
    const triggerTabList = document.querySelectorAll('#characterTabs button');
    triggerTabList.forEach(triggerEl => {
        new bootstrap.Tab(triggerEl);
    });

    // Get form elements
    const newBtn = document.getElementById('newBtn');
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

    // Function to load character data
    const loadCharacterData = () => {
        const savedData = localStorage.getItem('characterData');
        if (savedData) {
            const fullData = JSON.parse(savedData);
            const { feats, spells, inventory, ...characterData } = fullData;
            
            // Load basic data
            Object.entries(characterData).forEach(([name, value]) => {
                const input = form.querySelector(`[name="${name}"]`);
                if (input) {
                    input.value = value;
                    // Trigger change event for select elements to update bonuses
                    if (input.tagName === 'SELECT') {
                        input.dispatchEvent(new Event('change'));
                    }
                }
            });
            
            // Load feats and features
            if (feats) {
                featsHandler.loadFeatsData(feats);
            }

            // Load spells
            if (spells) {
                spellsHandler.loadSpellsData(spells);
            }

            // Load inventory
            if (inventory) {
                inventoryHandler.loadInventoryData(inventory);
            }
            
            // Update all calculations
            calculator.updateAbilityScores();
            calculator.calculateAC();
            calculator.calculateSavingThrows();
            calculator.calculateSkills();
            spellsHandler.updateSpellStats();
            inventoryHandler.updateTotalBulk();
        }
    };

    // Function to reset character data
    const resetCharacterData = () => {
        // Reset form inputs
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (input.type === 'number') {
                input.value = input.min || '0';
            } else if (input.type === 'checkbox') {
                input.checked = false;
            } else {
                input.value = '';
            }
        });

        // Reset feats and features
        featsHandler.loadFeatsData({ ancestryFeats: [], classFeats: [], skillFeats: [], generalFeats: [], classFeatures: [] });

        // Reset spells
        spellsHandler.loadSpellsData([]);

        // Reset inventory
        inventoryHandler.loadInventoryData({ currency: { pp: 0, gp: 0, sp: 0, cp: 0 }, items: { worn: [], readied: [], other: [] } });

        // Update all calculations
        calculator.updateAbilityScores();
        calculator.calculateAC();
        calculator.calculateSavingThrows();
        calculator.calculateSkills();
        spellsHandler.updateSpellStats();
        inventoryHandler.updateTotalBulk();
    };

    // New character button
    if (newBtn) {
        newBtn.addEventListener('click', resetCharacterData);
    }

    // Save character data
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const formData = new FormData(form);
            const characterData = Object.fromEntries(formData.entries());
            const featsData = featsHandler.getFeatsData();
            const spellsData = spellsHandler.getSpellsData();
            const inventoryData = inventoryHandler.getInventoryData();
            
            const fullData = {
                ...characterData,
                feats: featsData,
                spells: spellsData,
                inventory: inventoryData
            };
            
            localStorage.setItem('characterData', JSON.stringify(fullData));
        });
    }

    // Load character data button
    if (loadBtn) {
        loadBtn.addEventListener('click', loadCharacterData);
    }

    // Export character data
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const formData = new FormData(form);
            const characterData = Object.fromEntries(formData.entries());
            const featsData = featsHandler.getFeatsData();
            const spellsData = spellsHandler.getSpellsData();
            const inventoryData = inventoryHandler.getInventoryData();
            const dataStr = JSON.stringify({
                ...characterData,
                feats: featsData,
                spells: spellsData,
                inventory: inventoryData
            }, null, 2);
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
                        const { feats, spells, inventory, ...characterData } = fullData;
                        
                        // Load basic data
                        Object.entries(characterData).forEach(([name, value]) => {
                            const input = form.querySelector(`[name="${name}"]`);
                            if (input) {
                                input.value = value;
                                // Trigger change event for select elements to update bonuses
                                if (input.tagName === 'SELECT') {
                                    input.dispatchEvent(new Event('change'));
                                }
                            }
                        });
                        
                        // Load feats and features
                        if (feats) {
                            featsHandler.loadFeatsData(feats);
                        }

                        // Load spells
                        if (spells) {
                            spellsHandler.loadSpellsData(spells);
                        }

                        // Load inventory
                        if (inventory) {
                            inventoryHandler.loadInventoryData(inventory);
                        }
                        
                        // Update all calculations
                        calculator.updateAbilityScores();
                        calculator.calculateAC();
                        calculator.calculateSavingThrows();
                        calculator.calculateSkills();
                        spellsHandler.updateSpellStats();
                        inventoryHandler.updateTotalBulk();
                    } catch (error) {
                        console.error('Error importing character data:', error);
                    }
                };
                reader.readAsText(file);
            }
        });
    }

    // Setup event listeners after form is loaded
    setTimeout(() => {
        console.log('Setting up event listeners');
        calculator.setupEventListeners();
        featsHandler.setupEventListeners();
        spellsHandler.setupEventListeners();
        inventoryHandler.setupEventListeners();

        // Add event listeners for ancestry, background, and class changes
        const ancestrySelect = document.querySelector('[name="ancestry"]');
        const backgroundSelect = document.querySelector('[name="background"]');
        const classSelect = document.querySelector('[name="class"]');

        console.log('Found elements:', { ancestrySelect, backgroundSelect, classSelect });

        if (ancestrySelect) {
            console.log('Adding ancestry change listener');
            ancestrySelect.addEventListener('change', () => {
                console.log('Ancestry changed');
                const ancestry = ancestrySelect.value;
                console.log('Selected ancestry:', ancestry);
                if (ancestry) {
                    const ancestryBonuses = calculator.getAncestryBonuses(ancestry);
                    console.log('Ancestry bonuses:', ancestryBonuses);
                    Object.entries(ancestryBonuses).forEach(([ability, bonus]) => {
                        const bonusInput = document.querySelector(`[data-ability="${ability}"].ancestry-bonus`);
                        console.log(`Setting ${ability} bonus to ${bonus}`);
                        if (bonusInput) {
                            bonusInput.value = bonus;
                        }
                    });
                    calculator.updateAbilityScores();
                }
            });
        }

        if (backgroundSelect) {
            console.log('Adding background change listener');
            backgroundSelect.addEventListener('change', () => {
                console.log('Background changed');
                const background = backgroundSelect.value;
                console.log('Selected background:', background);
                if (background) {
                    const backgroundBonuses = calculator.getBackgroundBonuses(background);
                    console.log('Background bonuses:', backgroundBonuses);
                    Object.entries(backgroundBonuses).forEach(([ability, bonus]) => {
                        const bonusInput = document.querySelector(`[data-ability="${ability}"].background-bonus`);
                        console.log(`Setting ${ability} bonus to ${bonus}`);
                        if (bonusInput) {
                            bonusInput.value = bonus;
                        }
                    });
                    calculator.updateAbilityScores();
                }
            });
        }

        if (classSelect) {
            console.log('Adding class change listener');
            classSelect.addEventListener('change', () => {
                console.log('Class changed');
                const characterClass = classSelect.value;
                console.log('Selected class:', characterClass);
                if (characterClass) {
                    const classBonuses = calculator.getClassBonuses(characterClass);
                    console.log('Class bonuses:', classBonuses);
                    Object.entries(classBonuses).forEach(([ability, bonus]) => {
                        const bonusInput = document.querySelector(`[data-ability="${ability}"].class-bonus`);
                        console.log(`Setting ${ability} bonus to ${bonus}`);
                        if (bonusInput) {
                            bonusInput.value = bonus;
                        }
                    });
                    calculator.updateAbilityScores();
                }
            });
        }

        window.calculator = calculator;

        // Funkcje do obsługi ataków wręcz i dystansowych
        window.addMeleeStrike = () => {
            const meleeStrikes = document.getElementById('meleeStrikes');
            const strikeTemplate = meleeStrikes.querySelector('.melee-strike').cloneNode(true);
            
            // Aktualizuj ID i nazwy pól
            const strikeCount = meleeStrikes.children.length;
            const newId = strikeCount + 1;
            
            strikeTemplate.querySelectorAll('input, select').forEach(input => {
                const oldName = input.getAttribute('name');
                if (oldName) {
                    input.setAttribute('name', `${oldName}_${newId}`);
                }
            });
            
            // Dodaj przycisk usuwania
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger mt-2';
            deleteButton.textContent = 'Delete Strike';
            deleteButton.onclick = () => strikeTemplate.remove();
            strikeTemplate.appendChild(deleteButton);
            
            meleeStrikes.appendChild(strikeTemplate);
        };

        window.addRangedStrike = () => {
            const rangedStrikes = document.getElementById('rangedStrikes');
            const strikeTemplate = rangedStrikes.querySelector('.ranged-strike').cloneNode(true);
            
            // Aktualizuj ID i nazwy pól
            const strikeCount = rangedStrikes.children.length;
            const newId = strikeCount + 1;
            
            strikeTemplate.querySelectorAll('input, select').forEach(input => {
                const oldName = input.getAttribute('name');
                if (oldName) {
                    input.setAttribute('name', `${oldName}_${newId}`);
                }
            });
            
            // Dodaj przycisk usuwania
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger mt-2';
            deleteButton.textContent = 'Delete Strike';
            deleteButton.onclick = () => strikeTemplate.remove();
            strikeTemplate.appendChild(deleteButton);
            
            rangedStrikes.appendChild(strikeTemplate);
        };

        document.getElementById('addMeleeStrike')?.addEventListener('click', window.addMeleeStrike);
        document.getElementById('addRangedStrike')?.addEventListener('click', window.addRangedStrike);

        // Dodaj funkcje dla Lore Skills do globalnego zakresu
        const addLoreSkill = () => {
            const loreContainer = document.getElementById('loreSkillsContainer');
            const existingLores = loreContainer.querySelectorAll('.lore-skill').length;
            
            if (existingLores < 2) {
                const newLoreId = existingLores + 1;
                const newLoreRow = document.createElement('div');
                newLoreRow.className = 'row mb-2 lore-skill';
                newLoreRow.id = `customLore${newLoreId}`;
                
                newLoreRow.innerHTML = `
                    <div class="col-2">
                        <div class="input-group">
                            <input type="text" class="form-control" name="lore${newLoreId}_name" placeholder="Custom Lore">
                            <button class="btn btn-danger" type="button" onclick="removeLoreSkill(${newLoreId})">×</button>
                        </div>
                    </div>
                    <div class="col-1">
                        <input type="text" class="form-control" name="lore${newLoreId}_mod" readonly>
                    </div>
                    <div class="col-1">
                        <select class="form-control proficiency-select" name="lore${newLoreId}_prof">
                            <option value="0">U</option>
                            <option value="2">T</option>
                            <option value="4">E</option>
                            <option value="6">M</option>
                            <option value="8">L</option>
                        </select>
                    </div>
                    <div class="col-2">
                        <input type="number" class="form-control item-bonus" name="lore${newLoreId}_item" value="0">
                    </div>
                    <div class="col-1">
                        <input type="text" class="form-control skill-total" name="lore${newLoreId}_total" readonly>
                    </div>
                `;
                
                loreContainer.appendChild(newLoreRow);

                // Add event listeners for the new skill
                const profSelect = newLoreRow.querySelector('.proficiency-select');
                const itemInput = newLoreRow.querySelector('.item-bonus');
                
                profSelect.addEventListener('change', () => window.calculator.calculateSkills());
                itemInput.addEventListener('change', () => window.calculator.calculateSkills());
            }
        };

        const removeLoreSkill = (id) => {
            const loreRow = document.getElementById(`customLore${id}`);
            if (loreRow) {
                loreRow.remove();
                window.calculator.calculateSkills();
            }
        };

        window.addLoreSkill = addLoreSkill;
        window.removeLoreSkill = removeLoreSkill;

        const addLoreBtn = document.getElementById('addLoreSkill');
        if (addLoreBtn) {
            addLoreBtn.addEventListener('click', window.addLoreSkill);
        }

        // Load last saved character data
        loadCharacterData();
    }, 0);
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('characterForm');
    const saveBtn = document.getElementById('saveBtn');
    const loadBtn = document.getElementById('loadBtn');
    const exportBtn = document.getElementById('exportBtn');
    const importBtn = document.getElementById('importBtn');
    const importFile = document.getElementById('importFile');

    // Ability score bonuses data
    const ancestryBonuses = {
        'Dwarf': { constitution: 2, wisdom: 2, charisma: -2 },
        'Elf': { dexterity: 2, intelligence: 2, constitution: -2 },
        'Gnome': { constitution: 2, charisma: 2, strength: -2 },
        'Goblin': { dexterity: 2, charisma: 2, wisdom: -2 },
        'Halfling': { dexterity: 2, wisdom: 2, strength: -2 },
        'Human': { choice: 2 }, // Players can choose any ability score
        'Half-Elf': { choice: 2 },
        'Half-Orc': { choice: 2 },
        'Hobgoblin': { constitution: 2, intelligence: 2 },
        'Leshy': { constitution: 2, wisdom: 2, intelligence: -2 },
        'Lizardfolk': { strength: 2, wisdom: 2 },
        'Orc': { strength: 2, constitution: 2, intelligence: -2 },
        'Ratfolk': { dexterity: 2, intelligence: 2, strength: -2 },
        'Tengu': { dexterity: 2, charisma: 2 }
    };

    const backgroundBonuses = {
        'Acolyte': { wisdom: 2, intelligence: 2 },
        'Acrobat': { dexterity: 2, strength: 2 },
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
        'Guard': { strength: 2, constitution: 2 },
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

    const classBonuses = {
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

    // Function to update ability scores
    function updateAbilityScores() {
        const ancestry = form.elements['ancestry'].value;
        const background = form.elements['background'].value;
        const characterClass = form.elements['class'].value;

        // Reset all bonuses and remove color classes
        document.querySelectorAll('.ancestry-bonus, .background-bonus, .class-bonus').forEach(input => {
            input.value = 0;
            input.classList.remove('bonus-positive', 'bonus-negative');
        });

        // Apply ancestry bonuses
        if (ancestry && ancestryBonuses[ancestry]) {
            Object.entries(ancestryBonuses[ancestry]).forEach(([ability, bonus]) => {
                if (ability !== 'choice') {
                    const bonusInput = document.querySelector(`.ancestry-bonus[data-ability="${ability}"]`);
                    if (bonusInput) {
                        bonusInput.value = bonus;
                        if (bonus > 0) {
                            bonusInput.classList.add('bonus-positive');
                        } else if (bonus < 0) {
                            bonusInput.classList.add('bonus-negative');
                        }
                    }
                }
            });
        }

        // Apply background bonuses
        if (background && backgroundBonuses[background]) {
            Object.entries(backgroundBonuses[background]).forEach(([ability, bonus]) => {
                const bonusInput = document.querySelector(`.background-bonus[data-ability="${ability}"]`);
                if (bonusInput) {
                    bonusInput.value = bonus;
                    if (bonus > 0) {
                        bonusInput.classList.add('bonus-positive');
                    } else if (bonus < 0) {
                        bonusInput.classList.add('bonus-negative');
                    }
                }
            });
        }

        // Apply class bonuses
        if (characterClass && classBonuses[characterClass]) {
            Object.entries(classBonuses[characterClass]).forEach(([ability, bonus]) => {
                const bonusInput = document.querySelector(`.class-bonus[data-ability="${ability}"]`);
                if (bonusInput) {
                    bonusInput.value = bonus;
                    if (bonus > 0) {
                        bonusInput.classList.add('bonus-positive');
                    } else if (bonus < 0) {
                        bonusInput.classList.add('bonus-negative');
                    }
                }
            });
        }

        // Update totals
        document.querySelectorAll('.base-ability').forEach(baseInput => {
            const ability = baseInput.dataset.ability;
            const ancestryBonus = parseInt(document.querySelector(`.ancestry-bonus[data-ability="${ability}"]`).value) || 0;
            const backgroundBonus = parseInt(document.querySelector(`.background-bonus[data-ability="${ability}"]`).value) || 0;
            const classBonus = parseInt(document.querySelector(`.class-bonus[data-ability="${ability}"]`).value) || 0;
            const total = parseInt(baseInput.value) + ancestryBonus + backgroundBonus + classBonus;
            document.querySelector(`.total-ability[data-ability="${ability}"]`).value = total;
        });
    }

    // Add event listeners for ability score updates
    form.elements['ancestry'].addEventListener('change', updateAbilityScores);
    form.elements['background'].addEventListener('change', updateAbilityScores);
    form.elements['class'].addEventListener('change', updateAbilityScores);
    document.querySelectorAll('.base-ability').forEach(input => {
        input.addEventListener('change', updateAbilityScores);
    });

    // Save character data to localStorage
    saveBtn.addEventListener('click', () => {
        const formData = new FormData(form);
        const characterData = {};
        formData.forEach((value, key) => {
            characterData[key] = value;
        });
        
        // Save ability score totals
        document.querySelectorAll('.total-ability').forEach(input => {
            characterData[`total_${input.dataset.ability}`] = input.value;
        });
        
        localStorage.setItem('characterData', JSON.stringify(characterData));
        alert('Character saved successfully!');
    });

    // Load character data from localStorage
    loadBtn.addEventListener('click', () => {
        const savedData = localStorage.getItem('characterData');
        if (savedData) {
            const characterData = JSON.parse(savedData);
            Object.entries(characterData).forEach(([key, value]) => {
                const input = form.elements[key];
                if (input) {
                    input.value = value;
                }
            });
            updateAbilityScores();
            alert('Character loaded successfully!');
        } else {
            alert('No saved character found!');
        }
    });

    // Export character data to JSON file
    exportBtn.addEventListener('click', () => {
        const formData = new FormData(form);
        const characterData = {};
        formData.forEach((value, key) => {
            characterData[key] = value;
        });
        
        // Export ability score totals
        document.querySelectorAll('.total-ability').forEach(input => {
            characterData[`total_${input.dataset.ability}`] = input.value;
        });
        
        const dataStr = JSON.stringify(characterData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `${characterData.name || 'character'}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    });

    // Import character data from JSON file
    importBtn.addEventListener('click', () => {
        importFile.click();
    });

    importFile.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const characterData = JSON.parse(e.target.result);
                    Object.entries(characterData).forEach(([key, value]) => {
                        const input = form.elements[key];
                        if (input) {
                            input.value = value;
                        }
                    });
                    updateAbilityScores();
                    alert('Character imported successfully!');
                } catch (error) {
                    alert('Error importing character data. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
    });

    // Load any existing character data on page load
    const savedData = localStorage.getItem('characterData');
    if (savedData) {
        const characterData = JSON.parse(savedData);
        Object.entries(characterData).forEach(([key, value]) => {
            const input = form.elements[key];
            if (input) {
                input.value = value;
            }
        });
        updateAbilityScores();
    }
});

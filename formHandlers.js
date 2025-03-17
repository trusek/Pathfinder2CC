export class FormHandler {
    constructor() {
        this.characterForm = document.getElementById('characterForm');
        this.saveBtn = document.getElementById('saveBtn');
        this.loadBtn = document.getElementById('loadBtn');
        this.exportBtn = document.getElementById('exportBtn');
        this.importBtn = document.getElementById('importBtn');
        this.importFile = document.getElementById('importFile');
        
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Save character data
        this.saveBtn.addEventListener('click', () => {
            const formData = new FormData(this.characterForm);
            const characterData = Object.fromEntries(formData.entries());
            const featsData = this.getFeatsData();
            
            const fullData = {
                ...characterData,
                feats: featsData
            };
            
            localStorage.setItem('characterData', JSON.stringify(fullData));
            alert('Character data saved!');
        });

        // Load character data
        this.loadBtn.addEventListener('click', () => {
            const savedData = localStorage.getItem('characterData');
            if (savedData) {
                const fullData = JSON.parse(savedData);
                const { feats, ...characterData } = fullData;
                
                this.loadBasicData(characterData);
                if (feats) {
                    this.loadFeatsData(feats);
                }
                
                this.updateAllCalculations();
                alert('Character data loaded!');
            } else {
                alert('No saved character data found.');
            }
        });

        // Export character data
        this.exportBtn.addEventListener('click', () => {
            const formData = new FormData(this.characterForm);
            const characterData = Object.fromEntries(formData.entries());
            const featsData = this.getFeatsData();
            const dataStr = JSON.stringify({ ...characterData, feats: featsData }, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
            const exportFileDefaultName = 'character.json';

            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        });

        // Import character data
        this.importBtn.addEventListener('click', () => this.importFile.click());
        this.importFile.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const fullData = JSON.parse(e.target.result);
                        const { feats, ...characterData } = fullData;
                        
                        this.loadBasicData(characterData);
                        if (feats) {
                            this.loadFeatsData(feats);
                        }
                        
                        this.updateAllCalculations();
                        alert('Character data imported successfully!');
                    } catch (error) {
                        alert('Error importing character data: ' + error.message);
                    }
                };
                reader.readAsText(file);
            }
        });
    }

    loadBasicData(characterData) {
        Object.entries(characterData).forEach(([name, value]) => {
            const input = this.characterForm.querySelector(`[name="${name}"]`);
            if (input) {
                input.value = value;
            }
        });
    }

    updateAllCalculations() {
        window.updateAbilityScores();
        window.calculateAC();
        window.calculateSavingThrows();
        window.calculateSkills();
    }

    getFeatsData() {
        const featsData = {
            ancestryFeats: [],
            classFeats: [],
            skillFeats: [],
            generalFeats: [],
            classFeatures: []
        };

        // Get ancestry feats
        document.querySelectorAll('#ancestryFeatsContainer .feat-template:not(.d-none)').forEach(feat => {
            featsData.ancestryFeats.push({
                name: feat.querySelector('[name="ancestryFeatName[]"]').value,
                level: feat.querySelector('[name="ancestryFeatLevel[]"]').value,
                description: feat.querySelector('[name="ancestryFeatDesc[]"]').value
            });
        });

        // ... podobnie dla innych typów feat ...

        return featsData;
    }

    loadFeatsData(data) {
        // Clear existing feats
        ['ancestry', 'class', 'skill', 'general'].forEach(type => {
            const container = document.getElementById(`${type}FeatsContainer`);
            const templates = container.querySelectorAll('.feat-template:not(.d-none)');
            templates.forEach(template => template.remove());
        });

        // Load ancestry feats
        data.ancestryFeats?.forEach(feat => {
            const newFeat = window.addFeat('ancestry');
            newFeat.querySelector('[name="ancestryFeatName[]"]').value = feat.name;
            newFeat.querySelector('[name="ancestryFeatLevel[]"]').value = feat.level;
            newFeat.querySelector('[name="ancestryFeatDesc[]"]').value = feat.description;
        });

        // ... podobnie dla innych typów feat ...
    }
}

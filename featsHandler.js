export class FeatsHandler {
    constructor() {
        // Nie ustawiamy event listenerów w konstruktorze
    }

    setupEventListeners() {
        // Event listenery będą dodawane po załadowaniu formularza
    }

    addFeat(type) {
        const container = document.getElementById(`${type}FeatsContainer`);
        if (!container) return;

        const template = container.querySelector('.feat-template');
        const newFeat = template.cloneNode(true);
        
        newFeat.classList.remove('d-none');
        container.appendChild(newFeat);

        // Add event listener for remove button
        const removeBtn = newFeat.querySelector('.remove-feat');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                newFeat.classList.add('removing');
                setTimeout(() => {
                    newFeat.remove();
                }, 300);
            });
        }

        return newFeat;
    }

    addFeature() {
        const container = document.getElementById('classFeaturesContainer');
        if (!container) return;

        const template = container.querySelector('.feature-template');
        const newFeature = template.cloneNode(true);
        
        newFeature.classList.remove('d-none');
        container.appendChild(newFeature);

        // Add event listener for remove button
        const removeBtn = newFeature.querySelector('.remove-feature');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                newFeature.classList.add('removing');
                setTimeout(() => {
                    newFeature.remove();
                }, 300);
            });
        }

        return newFeature;
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
        document.querySelectorAll('#ancestryFeatsContainer .feat-template:not(.d-none)')?.forEach(feat => {
            featsData.ancestryFeats.push({
                name: feat.querySelector('[name="ancestryFeatName[]"]')?.value,
                level: feat.querySelector('[name="ancestryFeatLevel[]"]')?.value,
                description: feat.querySelector('[name="ancestryFeatDesc[]"]')?.value
            });
        });

        // Get class feats
        document.querySelectorAll('#classFeatsContainer .feat-template:not(.d-none)')?.forEach(feat => {
            featsData.classFeats.push({
                name: feat.querySelector('[name="classFeatName[]"]')?.value,
                level: feat.querySelector('[name="classFeatLevel[]"]')?.value,
                description: feat.querySelector('[name="classFeatDesc[]"]')?.value
            });
        });

        // Get skill feats
        document.querySelectorAll('#skillFeatsContainer .feat-template:not(.d-none)')?.forEach(feat => {
            featsData.skillFeats.push({
                name: feat.querySelector('[name="skillFeatName[]"]')?.value,
                level: feat.querySelector('[name="skillFeatLevel[]"]')?.value,
                description: feat.querySelector('[name="skillFeatDesc[]"]')?.value
            });
        });

        // Get general feats
        document.querySelectorAll('#generalFeatsContainer .feat-template:not(.d-none)')?.forEach(feat => {
            featsData.generalFeats.push({
                name: feat.querySelector('[name="generalFeatName[]"]')?.value,
                level: feat.querySelector('[name="generalFeatLevel[]"]')?.value,
                description: feat.querySelector('[name="generalFeatDesc[]"]')?.value
            });
        });

        // Get class features
        document.querySelectorAll('#classFeaturesContainer .feature-template:not(.d-none)')?.forEach(feature => {
            featsData.classFeatures.push({
                name: feature.querySelector('[name="classFeatureName[]"]')?.value,
                level: feature.querySelector('[name="classFeatureLevel[]"]')?.value,
                description: feature.querySelector('[name="classFeatureDesc[]"]')?.value
            });
        });

        return featsData;
    }

    loadFeatsData(data) {
        // Clear existing feats
        ['ancestry', 'class', 'skill', 'general'].forEach(type => {
            const container = document.getElementById(`${type}FeatsContainer`);
            if (container) {
                const templates = container.querySelectorAll('.feat-template:not(.d-none)');
                templates.forEach(template => template.remove());
            }
        });

        // Clear existing features
        const featuresContainer = document.getElementById('classFeaturesContainer');
        if (featuresContainer) {
            const featureTemplates = featuresContainer.querySelectorAll('.feature-template:not(.d-none)');
            featureTemplates.forEach(template => template.remove());
        }

        // Load ancestry feats
        data.ancestryFeats?.forEach(feat => {
            const newFeat = this.addFeat('ancestry');
            if (newFeat) {
                const nameInput = newFeat.querySelector('[name="ancestryFeatName[]"]');
                const levelInput = newFeat.querySelector('[name="ancestryFeatLevel[]"]');
                const descInput = newFeat.querySelector('[name="ancestryFeatDesc[]"]');
                
                if (nameInput) nameInput.value = feat.name || '';
                if (levelInput) levelInput.value = feat.level || '';
                if (descInput) descInput.value = feat.description || '';
            }
        });

        // Load class feats
        data.classFeats?.forEach(feat => {
            const newFeat = this.addFeat('class');
            if (newFeat) {
                const nameInput = newFeat.querySelector('[name="classFeatName[]"]');
                const levelInput = newFeat.querySelector('[name="classFeatLevel[]"]');
                const descInput = newFeat.querySelector('[name="classFeatDesc[]"]');
                
                if (nameInput) nameInput.value = feat.name || '';
                if (levelInput) levelInput.value = feat.level || '';
                if (descInput) descInput.value = feat.description || '';
            }
        });

        // Load skill feats
        data.skillFeats?.forEach(feat => {
            const newFeat = this.addFeat('skill');
            if (newFeat) {
                const nameInput = newFeat.querySelector('[name="skillFeatName[]"]');
                const levelInput = newFeat.querySelector('[name="skillFeatLevel[]"]');
                const descInput = newFeat.querySelector('[name="skillFeatDesc[]"]');
                
                if (nameInput) nameInput.value = feat.name || '';
                if (levelInput) levelInput.value = feat.level || '';
                if (descInput) descInput.value = feat.description || '';
            }
        });

        // Load general feats
        data.generalFeats?.forEach(feat => {
            const newFeat = this.addFeat('general');
            if (newFeat) {
                const nameInput = newFeat.querySelector('[name="generalFeatName[]"]');
                const levelInput = newFeat.querySelector('[name="generalFeatLevel[]"]');
                const descInput = newFeat.querySelector('[name="generalFeatDesc[]"]');
                
                if (nameInput) nameInput.value = feat.name || '';
                if (levelInput) levelInput.value = feat.level || '';
                if (descInput) descInput.value = feat.description || '';
            }
        });

        // Load class features
        data.classFeatures?.forEach(feature => {
            const newFeature = this.addFeature();
            if (newFeature) {
                const nameInput = newFeature.querySelector('[name="classFeatureName[]"]');
                const levelInput = newFeature.querySelector('[name="classFeatureLevel[]"]');
                const descInput = newFeature.querySelector('[name="classFeatureDesc[]"]');
                
                if (nameInput) nameInput.value = feature.name || '';
                if (levelInput) levelInput.value = feature.level || '';
                if (descInput) descInput.value = feature.description || '';
            }
        });
    }
}

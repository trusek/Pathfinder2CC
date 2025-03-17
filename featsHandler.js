export class FeatsHandler {
    constructor() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('addAncestryFeat')?.addEventListener('click', () => this.addFeat('ancestry'));
        document.getElementById('addClassFeat')?.addEventListener('click', () => this.addFeat('class'));
        document.getElementById('addSkillFeat')?.addEventListener('click', () => this.addFeat('skill'));
        document.getElementById('addGeneralFeat')?.addEventListener('click', () => this.addFeat('general'));
        document.getElementById('addClassFeature')?.addEventListener('click', () => this.addFeature());
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
        removeBtn.addEventListener('click', () => {
            newFeat.classList.add('removing');
            setTimeout(() => {
                newFeat.remove();
            }, 300);
        });

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
        removeBtn.addEventListener('click', () => {
            newFeature.classList.add('removing');
            setTimeout(() => {
                newFeature.remove();
            }, 300);
        });

        return newFeature;
    }
}

export class SpellsHandler {
    constructor() {
        this.spells = [];
    }

    setupEventListeners() {
        // Add listener for spellcasting ability changes
        const spellcastingAbilitySelect = document.querySelector('[name="spellcastingAbility"]');
        if (spellcastingAbilitySelect) {
            spellcastingAbilitySelect.addEventListener('change', () => this.updateSpellStats());
        }

        // Add listener for proficiency changes that affect spell stats
        const spellProficiencyInput = document.querySelector('[name="spellProficiency"]');
        if (spellProficiencyInput) {
            spellProficiencyInput.addEventListener('change', () => this.updateSpellStats());
        }
    }

    updateSpellStats() {
        const spellcastingAbility = document.querySelector('[name="spellcastingAbility"]').value;
        if (!spellcastingAbility) return;

        const abilityScore = parseInt(document.querySelector(`[data-ability="${spellcastingAbility}"].total-ability`)?.value) || 10;
        const abilityMod = Math.floor((abilityScore - 10) / 2);
        
        const level = parseInt(document.querySelector('[name="level"]')?.value) || 0;
        const proficiency = parseInt(document.querySelector('[name="spellProficiency"]')?.value) || 0;

        // Calculate spell attack bonus
        const spellAttackBonus = document.querySelector('[name="spellAttackBonus"]');
        if (spellAttackBonus) {
            spellAttackBonus.value = abilityMod + proficiency + level;
        }

        // Calculate spell DC
        const spellDC = document.querySelector('[name="spellDC"]');
        if (spellDC) {
            spellDC.value = 10 + abilityMod + proficiency + level;
        }
    }

    addSpell() {
        const spellList = document.getElementById('spellList');
        const spellId = Date.now();
        
        const spellHtml = `
            <div class="spell-entry card mb-3" data-spell-id="${spellId}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3 mb-2">
                            <label class="form-label">Name</label>
                            <input type="text" class="form-control" name="spellName_${spellId}">
                        </div>
                        <div class="col-md-2 mb-2">
                            <label class="form-label">Level</label>
                            <select class="form-control" name="spellLevel_${spellId}">
                                <option value="0">Cantrip</option>
                                <option value="1">1st</option>
                                <option value="2">2nd</option>
                                <option value="3">3rd</option>
                                <option value="4">4th</option>
                                <option value="5">5th</option>
                                <option value="6">6th</option>
                                <option value="7">7th</option>
                                <option value="8">8th</option>
                                <option value="9">9th</option>
                            </select>
                        </div>
                        <div class="col-md-2 mb-2">
                            <label class="form-label">Traditions</label>
                            <select class="form-control" name="spellTradition_${spellId}">
                                <option value="arcane">Arcane</option>
                                <option value="divine">Divine</option>
                                <option value="occult">Occult</option>
                                <option value="primal">Primal</option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-2">
                            <label class="form-label">Components</label>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" name="spellComponentMaterial_${spellId}">
                                <label class="form-check-label">Material</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" name="spellComponentSomatic_${spellId}">
                                <label class="form-check-label">Somatic</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="checkbox" name="spellComponentVerbal_${spellId}">
                                <label class="form-check-label">Verbal</label>
                            </div>
                        </div>
                        <div class="col-md-1 mb-2">
                            <label class="form-label">&nbsp;</label>
                            <button type="button" class="btn btn-danger" onclick="removeSpell(${spellId})">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12">
                            <label class="form-label">Description</label>
                            <textarea class="form-control" name="spellDescription_${spellId}" rows="3"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        spellList.insertAdjacentHTML('beforeend', spellHtml);
        this.spells.push(spellId);
    }

    removeSpell(spellId) {
        const spellEntry = document.querySelector(`[data-spell-id="${spellId}"]`);
        if (spellEntry) {
            spellEntry.remove();
            this.spells = this.spells.filter(id => id !== spellId);
        }
    }

    getSpellsData() {
        return this.spells.map(spellId => {
            const nameInput = document.querySelector(`[name="spellName_${spellId}"]`);
            const levelSelect = document.querySelector(`[name="spellLevel_${spellId}"]`);
            const traditionSelect = document.querySelector(`[name="spellTradition_${spellId}"]`);
            const materialCheck = document.querySelector(`[name="spellComponentMaterial_${spellId}"]`);
            const somaticCheck = document.querySelector(`[name="spellComponentSomatic_${spellId}"]`);
            const verbalCheck = document.querySelector(`[name="spellComponentVerbal_${spellId}"]`);
            const descriptionText = document.querySelector(`[name="spellDescription_${spellId}"]`);

            return {
                id: spellId,
                name: nameInput?.value || '',
                level: levelSelect?.value || '0',
                tradition: traditionSelect?.value || 'arcane',
                components: {
                    material: materialCheck?.checked || false,
                    somatic: somaticCheck?.checked || false,
                    verbal: verbalCheck?.checked || false
                },
                description: descriptionText?.value || ''
            };
        });
    }

    loadSpellsData(spells) {
        // Clear existing spells
        const spellList = document.getElementById('spellList');
        spellList.innerHTML = '';
        this.spells = [];

        // Load each spell
        spells.forEach(spell => {
            this.spells.push(spell.id);
            const spellHtml = `
                <div class="spell-entry card mb-3" data-spell-id="${spell.id}">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-3 mb-2">
                                <label class="form-label">Name</label>
                                <input type="text" class="form-control" name="spellName_${spell.id}" value="${spell.name}">
                            </div>
                            <div class="col-md-2 mb-2">
                                <label class="form-label">Level</label>
                                <select class="form-control" name="spellLevel_${spell.id}">
                                    <option value="0" ${spell.level === '0' ? 'selected' : ''}>Cantrip</option>
                                    <option value="1" ${spell.level === '1' ? 'selected' : ''}>1st</option>
                                    <option value="2" ${spell.level === '2' ? 'selected' : ''}>2nd</option>
                                    <option value="3" ${spell.level === '3' ? 'selected' : ''}>3rd</option>
                                    <option value="4" ${spell.level === '4' ? 'selected' : ''}>4th</option>
                                    <option value="5" ${spell.level === '5' ? 'selected' : ''}>5th</option>
                                    <option value="6" ${spell.level === '6' ? 'selected' : ''}>6th</option>
                                    <option value="7" ${spell.level === '7' ? 'selected' : ''}>7th</option>
                                    <option value="8" ${spell.level === '8' ? 'selected' : ''}>8th</option>
                                    <option value="9" ${spell.level === '9' ? 'selected' : ''}>9th</option>
                                </select>
                            </div>
                            <div class="col-md-2 mb-2">
                                <label class="form-label">Traditions</label>
                                <select class="form-control" name="spellTradition_${spell.id}">
                                    <option value="arcane" ${spell.tradition === 'arcane' ? 'selected' : ''}>Arcane</option>
                                    <option value="divine" ${spell.tradition === 'divine' ? 'selected' : ''}>Divine</option>
                                    <option value="occult" ${spell.tradition === 'occult' ? 'selected' : ''}>Occult</option>
                                    <option value="primal" ${spell.tradition === 'primal' ? 'selected' : ''}>Primal</option>
                                </select>
                            </div>
                            <div class="col-md-4 mb-2">
                                <label class="form-label">Components</label>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" name="spellComponentMaterial_${spell.id}" ${spell.components.material ? 'checked' : ''}>
                                    <label class="form-check-label">Material</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" name="spellComponentSomatic_${spell.id}" ${spell.components.somatic ? 'checked' : ''}>
                                    <label class="form-check-label">Somatic</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="checkbox" name="spellComponentVerbal_${spell.id}" ${spell.components.verbal ? 'checked' : ''}>
                                    <label class="form-check-label">Verbal</label>
                                </div>
                            </div>
                            <div class="col-md-1 mb-2">
                                <label class="form-label">&nbsp;</label>
                                <button type="button" class="btn btn-danger" onclick="removeSpell(${spell.id})">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <label class="form-label">Description</label>
                                <textarea class="form-control" name="spellDescription_${spell.id}" rows="3">${spell.description}</textarea>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            spellList.insertAdjacentHTML('beforeend', spellHtml);
        });
    }
}

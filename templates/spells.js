export const spellsTemplate = `
    <div class="tab-pane fade" id="spells">
        <div class="form-section">
            <h3 class="section-title">Spellcasting</h3>
            
            <!-- Spellcasting Ability -->
            <div class="row mb-3">
                <div class="col-md-4">
                    <label class="form-label">Spellcasting Ability</label>
                    <select class="form-control" name="spellcastingAbility">
                        <option value="">None</option>
                        <option value="intelligence">Intelligence</option>
                        <option value="wisdom">Wisdom</option>
                        <option value="charisma">Charisma</option>
                    </select>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Spell Attack Bonus</label>
                    <input type="number" class="form-control" name="spellAttackBonus" value="0" readonly>
                </div>
                <div class="col-md-4">
                    <label class="form-label">Spell DC</label>
                    <input type="number" class="form-control" name="spellDC" value="0" readonly>
                </div>
            </div>

            <!-- Spell Slots -->
            <div class="spell-slots mb-4">
                <h4>Spell Slots</h4>
                <div class="row">
                    <div class="col-md-2 mb-2">
                        <label class="form-label">Cantrips</label>
                        <input type="number" class="form-control" name="cantripSlots" value="0" min="0">
                    </div>
                    <div class="col-md-2 mb-2">
                        <label class="form-label">1st Level</label>
                        <input type="number" class="form-control" name="firstLevelSlots" value="0" min="0">
                    </div>
                    <div class="col-md-2 mb-2">
                        <label class="form-label">2nd Level</label>
                        <input type="number" class="form-control" name="secondLevelSlots" value="0" min="0">
                    </div>
                    <div class="col-md-2 mb-2">
                        <label class="form-label">3rd Level</label>
                        <input type="number" class="form-control" name="thirdLevelSlots" value="0" min="0">
                    </div>
                    <div class="col-md-2 mb-2">
                        <label class="form-label">4th Level</label>
                        <input type="number" class="form-control" name="fourthLevelSlots" value="0" min="0">
                    </div>
                    <div class="col-md-2 mb-2">
                        <label class="form-label">5th Level</label>
                        <input type="number" class="form-control" name="fifthLevelSlots" value="0" min="0">
                    </div>
                    <div class="col-md-2 mb-2">
                        <label class="form-label">6th Level</label>
                        <input type="number" class="form-control" name="sixthLevelSlots" value="0" min="0">
                    </div>
                    <div class="col-md-2 mb-2">
                        <label class="form-label">7th Level</label>
                        <input type="number" class="form-control" name="seventhLevelSlots" value="0" min="0">
                    </div>
                    <div class="col-md-2 mb-2">
                        <label class="form-label">8th Level</label>
                        <input type="number" class="form-control" name="eighthLevelSlots" value="0" min="0">
                    </div>
                    <div class="col-md-2 mb-2">
                        <label class="form-label">9th Level</label>
                        <input type="number" class="form-control" name="ninthLevelSlots" value="0" min="0">
                    </div>
                </div>
            </div>

            <!-- Spell List -->
            <div class="spell-list">
                <h4>Spell List</h4>
                <div id="spellList">
                    <!-- Spell entries will be added here dynamically -->
                </div>
                <button type="button" class="btn btn-primary mt-3" onclick="addSpell()">Add Spell</button>
            </div>
        </div>
    </div>
`;

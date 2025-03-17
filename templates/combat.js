export const combatTemplate = `
    <div class="tab-pane fade" id="combat">
        <div class="row">
            <div class="col-md-6">
                <div class="armor-class-box">
                    <h4>Armor Class</h4>
                    <div class="form-group">
                        <label>Base AC</label>
                        <input type="number" class="form-control" name="baseAC" value="10" readonly>
                    </div>
                    <div class="form-group">
                        <label>Dexterity Modifier</label>
                        <input type="number" class="form-control" name="dexModAC" value="0" readonly>
                    </div>
                    <div class="form-group">
                        <label>Armor Bonus</label>
                        <input type="number" class="form-control" name="armorBonus" value="0">
                    </div>
                    <div class="form-group">
                        <label>Item Bonus</label>
                        <input type="number" class="form-control" name="itemBonusAC" value="0">
                    </div>
                    <div class="form-group">
                        <label>Total AC</label>
                        <input type="number" class="form-control" name="totalAC" value="10" readonly>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="hit-points-box">
                    <h4>Hit Points</h4>
                    <div class="form-group">
                        <label>Maximum HP</label>
                        <input type="number" class="form-control" name="maxHP" value="0">
                    </div>
                    <div class="form-group">
                        <label>Current HP</label>
                        <input type="number" class="form-control" name="currentHP" value="0">
                    </div>
                    <div class="form-group">
                        <label>Temporary HP</label>
                        <input type="number" class="form-control" name="tempHP" value="0">
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row mt-4">
            <div class="col-12">
                <h4>Saving Throws</h4>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Fortitude</label>
                            <div class="input-group">
                                <input type="number" class="form-control" name="fortitudeProficiency" value="0">
                                <input type="number" class="form-control" name="fortitudeAbilityMod" value="0" readonly>
                                <input type="number" class="form-control" name="fortitudeItemBonus" value="0">
                                <input type="number" class="form-control" name="fortitudeTotal" value="0" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Reflex</label>
                            <div class="input-group">
                                <input type="number" class="form-control" name="reflexProficiency" value="0">
                                <input type="number" class="form-control" name="reflexAbilityMod" value="0" readonly>
                                <input type="number" class="form-control" name="reflexItemBonus" value="0">
                                <input type="number" class="form-control" name="reflexTotal" value="0" readonly>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Will</label>
                            <div class="input-group">
                                <input type="number" class="form-control" name="willProficiency" value="0">
                                <input type="number" class="form-control" name="willAbilityMod" value="0" readonly>
                                <input type="number" class="form-control" name="willItemBonus" value="0">
                                <input type="number" class="form-control" name="willTotal" value="0" readonly>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

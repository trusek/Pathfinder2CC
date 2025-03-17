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
                    <div class="form-group">
                        <label>Dying Value</label>
                        <input type="number" class="form-control" name="dying" value="0" min="0" max="4">
                    </div>
                    <div class="form-group">
                        <label>Wounded Value</label>
                        <input type="number" class="form-control" name="wounded" value="0" min="0" max="3">
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
        
        <div class="row mt-4">
            <div class="col-12">
                <h4>Speed</h4>
                <div class="row">
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Speed</label>
                            <div class="input-group">
                                <input type="number" class="form-control" name="speed" value="25">
                                <span class="input-group-text">feet</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Melee Speed</label>
                            <div class="input-group">
                                <input type="number" class="form-control" name="meleeSpeed" value="25">
                                <span class="input-group-text">feet</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                            <label>Ranged Speed</label>
                            <div class="input-group">
                                <input type="number" class="form-control" name="rangedSpeed" value="25">
                                <span class="input-group-text">feet</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row mt-4">
            <div class="col-12">
                <h4>Immunities</h4>
                <div class="form-group">
                    <input type="text" class="form-control" name="immunities" placeholder="List immunities...">
                </div>
            </div>
        </div>
        
        <div class="row mt-4">
            <div class="col-12">
                <h4>Conditions</h4>
                <div class="form-group">
                    <textarea class="form-control" name="conditions" rows="2" placeholder="List current conditions..."></textarea>
                </div>
            </div>
        </div>
        
        <div class="row mt-4">
            <div class="col-12">
                <h4>Class DC</h4>
                <div class="row">
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Class DC</label>
                            <input type="number" class="form-control" name="classDcBase" value="10" readonly>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Key Ability</label>
                            <select class="form-control" name="classDcKey">
                                <option value="">None</option>
                                <option value="strength">STR</option>
                                <option value="dexterity">DEX</option>
                                <option value="constitution">CON</option>
                                <option value="intelligence">INT</option>
                                <option value="wisdom">WIS</option>
                                <option value="charisma">CHA</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Proficiency</label>
                            <select class="form-control" name="classDcProf">
                                <option value="0">Untrained</option>
                                <option value="2">Trained</option>
                                <option value="4">Expert</option>
                                <option value="6">Master</option>
                                <option value="8">Legendary</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Item Bonus</label>
                            <input type="number" class="form-control" name="classDcItem" value="0">
                        </div>
                    </div>
                    <div class="col-md-2">
                        <div class="form-group">
                            <label>Total</label>
                            <input type="number" class="form-control" name="classDcTotal" readonly>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="form-section">
            <h3 class="section-title">Combat</h3>
            
            <!-- Basic Combat Stats -->
            <div class="row mb-3">
                <div class="col-md-4">
                    <div class="form-group">
                        <label>Armor Class</label>
                        <div class="input-group">
                            <input type="number" class="form-control" name="ac_dex" readonly>
                            <input type="number" class="form-control" name="ac_prof" value="0">
                            <input type="number" class="form-control" name="ac_item" value="0">
                            <input type="number" class="form-control" name="ac_total" readonly>
                        </div>
                    </div>
                </div>
                
                <div class="col-md-4">
                    <div class="form-group">
                        <label>Class DC</label>
                        <div class="input-group">
                            <select class="form-control" name="classDcKeyAbility">
                                <option value="strength">Strength</option>
                                <option value="dexterity">Dexterity</option>
                                <option value="constitution">Constitution</option>
                                <option value="intelligence">Intelligence</option>
                                <option value="wisdom">Wisdom</option>
                                <option value="charisma">Charisma</option>
                            </select>
                            <input type="number" class="form-control" name="classDcProf" value="0">
                            <input type="number" class="form-control" name="classDcItem" value="0">
                            <input type="number" class="form-control" name="classDcTotal" readonly>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Melee Strikes -->
            <h4 class="mt-4">Melee Strikes</h4>
            <div id="meleeStrikes">
                <!-- Melee Strike Template - będzie powielany przez JavaScript -->
                <div class="melee-strike mb-3">
                    <div class="row">
                        <div class="col-4">
                            <label>Weapon</label>
                            <input type="text" class="form-control" name="meleeWeapon">
                        </div>
                        <div class="col-1">
                            <label>STR</label>
                            <input type="text" class="form-control" name="meleeStr" readonly>
                        </div>
                        <div class="col-1">
                            <label>Prof</label>
                            <select class="form-control" name="meleeProf">
                                <option value="0">U</option>
                                <option value="2">T</option>
                                <option value="4">E</option>
                                <option value="6">M</option>
                                <option value="8">L</option>
                            </select>
                        </div>
                        <div class="col-2">
                            <label>Item</label>
                            <input type="number" class="form-control" name="meleeItem" value="0">
                        </div>
                        <div class="col-1">
                            <label>Total</label>
                            <input type="text" class="form-control" name="meleeTotal" readonly>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-2">
                            <label>Damage Dice</label>
                            <input type="text" class="form-control" name="meleeDice">
                        </div>
                        <div class="col-2">
                            <label>STR to dmg</label>
                            <input type="text" class="form-control" name="meleeStrDmg" readonly>
                        </div>
                        <div class="col-1">
                            <label>B</label>
                            <input type="checkbox" class="form-check-input" name="meleeB">
                        </div>
                        <div class="col-1">
                            <label>P</label>
                            <input type="checkbox" class="form-check-input" name="meleeP">
                        </div>
                        <div class="col-1">
                            <label>S</label>
                            <input type="checkbox" class="form-check-input" name="meleeS">
                        </div>
                        <div class="col-2">
                            <label>Weapon Spec</label>
                            <input type="text" class="form-control" name="meleeSpec">
                        </div>
                        <div class="col-3">
                            <label>Other</label>
                            <input type="text" class="form-control" name="meleeOther">
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-12">
                            <label>Traits</label>
                            <input type="text" class="form-control" name="meleeTraits">
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-secondary mb-3" id="addMeleeStrike">Add Melee Strike</button>

            <!-- Ranged Strikes -->
            <h4 class="mt-4">Ranged Strikes</h4>
            <div id="rangedStrikes">
                <!-- Ranged Strike Template - będzie powielany przez JavaScript -->
                <div class="ranged-strike mb-3">
                    <div class="row">
                        <div class="col-4">
                            <label>Weapon</label>
                            <input type="text" class="form-control" name="rangedWeapon">
                        </div>
                        <div class="col-1">
                            <label>DEX</label>
                            <input type="text" class="form-control" name="rangedDex" readonly>
                        </div>
                        <div class="col-1">
                            <label>Prof</label>
                            <select class="form-control" name="rangedProf">
                                <option value="0">U</option>
                                <option value="2">T</option>
                                <option value="4">E</option>
                                <option value="6">M</option>
                                <option value="8">L</option>
                            </select>
                        </div>
                        <div class="col-2">
                            <label>Item</label>
                            <input type="number" class="form-control" name="rangedItem" value="0">
                        </div>
                        <div class="col-1">
                            <label>Total</label>
                            <input type="text" class="form-control" name="rangedTotal" readonly>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-2">
                            <label>Damage Dice</label>
                            <input type="text" class="form-control" name="rangedDice">
                        </div>
                        <div class="col-2">
                            <label>Special</label>
                            <input type="text" class="form-control" name="rangedSpecial">
                        </div>
                        <div class="col-1">
                            <label>B</label>
                            <input type="checkbox" class="form-check-input" name="rangedB">
                        </div>
                        <div class="col-1">
                            <label>P</label>
                            <input type="checkbox" class="form-check-input" name="rangedP">
                        </div>
                        <div class="col-1">
                            <label>S</label>
                            <input type="checkbox" class="form-check-input" name="rangedS">
                        </div>
                        <div class="col-2">
                            <label>Weapon Spec</label>
                            <input type="text" class="form-control" name="rangedSpec">
                        </div>
                        <div class="col-3">
                            <label>Other</label>
                            <input type="text" class="form-control" name="rangedOther">
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-12">
                            <label>Traits</label>
                            <input type="text" class="form-control" name="rangedTraits">
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" class="btn btn-secondary mb-3" id="addRangedStrike">Add Ranged Strike</button>
        </div>
    </div>
`;

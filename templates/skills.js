export const skillsTemplate = `
    <div class="tab-pane fade" id="skills">
        <div class="form-section">
            <h3 class="section-title">Skills</h3>
            <table class="table">
                <thead>
                    <tr>
                        <th>Skill</th>
                        <th>Ability</th>
                        <th>Proficiency</th>
                        <th>Ability Mod</th>
                        <th>Item Bonus</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Acrobatics</td>
                        <td>Dexterity</td>
                        <td><input type="number" class="form-control" name="acrobaticsProficiency" value="0"></td>
                        <td><input type="number" class="form-control" name="acrobaticsAbilityMod" value="0" readonly></td>
                        <td><input type="number" class="form-control" name="acrobaticsItemBonus" value="0"></td>
                        <td><input type="number" class="form-control" name="acrobaticsTotal" value="0" readonly></td>
                    </tr>
                    <tr>
                        <td>Arcana</td>
                        <td>Intelligence</td>
                        <td><input type="number" class="form-control" name="arcanaProficiency" value="0"></td>
                        <td><input type="number" class="form-control" name="arcanaAbilityMod" value="0" readonly></td>
                        <td><input type="number" class="form-control" name="arcanaItemBonus" value="0"></td>
                        <td><input type="number" class="form-control" name="arcanaTotal" value="0" readonly></td>
                    </tr>
                    <tr>
                        <td>Athletics</td>
                        <td>Strength</td>
                        <td><input type="number" class="form-control" name="athleticsProficiency" value="0"></td>
                        <td><input type="number" class="form-control" name="athleticsAbilityMod" value="0" readonly></td>
                        <td><input type="number" class="form-control" name="athleticsItemBonus" value="0"></td>
                        <td><input type="number" class="form-control" name="athleticsTotal" value="0" readonly></td>
                    </tr>
                    <tr>
                        <td>Crafting</td>
                        <td>Intelligence</td>
                        <td><input type="number" class="form-control" name="craftingProficiency" value="0"></td>
                        <td><input type="number" class="form-control" name="craftingAbilityMod" value="0" readonly></td>
                        <td><input type="number" class="form-control" name="craftingItemBonus" value="0"></td>
                        <td><input type="number" class="form-control" name="craftingTotal" value="0" readonly></td>
                    </tr>
                    <tr>
                        <td>Deception</td>
                        <td>Charisma</td>
                        <td><input type="number" class="form-control" name="deceptionProficiency" value="0"></td>
                        <td><input type="number" class="form-control" name="deceptionAbilityMod" value="0" readonly></td>
                        <td><input type="number" class="form-control" name="deceptionItemBonus" value="0"></td>
                        <td><input type="number" class="form-control" name="deceptionTotal" value="0" readonly></td>
                    </tr>
                    <tr>
                        <td>Diplomacy</td>
                        <td>Charisma</td>
                        <td><input type="number" class="form-control" name="diplomacyProficiency" value="0"></td>
                        <td><input type="number" class="form-control" name="diplomacyAbilityMod" value="0" readonly></td>
                        <td><input type="number" class="form-control" name="diplomacyItemBonus" value="0"></td>
                        <td><input type="number" class="form-control" name="diplomacyTotal" value="0" readonly></td>
                    </tr>
                    <tr>
                        <td>Intimidation</td>
                        <td>Charisma</td>
                        <td><input type="number" class="form-control" name="intimidationProficiency" value="0"></td>
                        <td><input type="number" class="form-control" name="intimidationAbilityMod" value="0" readonly></td>
                        <td><input type="number" class="form-control" name="intimidationItemBonus" value="0"></td>
                        <td><input type="number" class="form-control" name="intimidationTotal" value="0" readonly></td>
                    </tr>
                    <tr>
                        <td>Medicine</td>
                        <td>Wisdom</td>
                        <td><input type="number" class="form-control" name="medicineProficiency" value="0"></td>
                        <td><input type="number" class="form-control" name="medicineAbilityMod" value="0" readonly></td>
                        <td><input type="number" class="form-control" name="medicineItemBonus" value="0"></td>
                        <td><input type="number" class="form-control" name="medicineTotal" value="0" readonly></td>
                    </tr>
                    <tr>
                        <td>Nature</td>
                        <td>Wisdom</td>
                        <td><input type="number" class="form-control" name="natureProficiency" value="0"></td>
                        <td><input type="number" class="form-control" name="natureAbilityMod" value="0" readonly></td>
                        <td><input type="number" class="form-control" name="natureItemBonus" value="0"></td>
                        <td><input type="number" class="form-control" name="natureTotal" value="0" readonly></td>
                    </tr>
                    <tr>
                        <td>Occultism</td>
                        <td>Intelligence</td>
                        <td><input type="number" class="form-control" name="occultismProficiency" value="0"></td>
                        <td><input type="number" class="form-control" name="occultismAbilityMod" value="0" readonly></td>
                        <td><input type="number" class="form-control" name="occultismItemBonus" value="0"></td>
                        <td><input type="number" class="form-control" name="occultismTotal" value="0" readonly></td>
                    </tr>
                    <tr>
                        <td>Performance</td>
                        <td>Charisma</td>
                        <td><input type="number" class="form-control" name="performanceProficiency" value="0"></td>
                        <td><input type="number" class="form-control" name="performanceAbilityMod" value="0" readonly></td>
                        <td><input type="number" class="form-control" name="performanceItemBonus" value="0"></td>
                        <td><input type="number" class="form-control" name="performanceTotal" value="0" readonly></td>
                    </tr>
                    <tr>
                        <td>Religion</td>
                        <td>Wisdom</td>
                        <td><input type="number" class="form-control" name="religionProficiency" value="0"></td>
                        <td><input type="number" class="form-control" name="religionAbilityMod" value="0" readonly></td>
                        <td><input type="number" class="form-control" name="religionItemBonus" value="0"></td>
                        <td><input type="number" class="form-control" name="religionTotal" value="0" readonly></td>
                    </tr>
                    <tr>
                        <td>Society</td>
                        <td>Intelligence</td>
                        <td><input type="number" class="form-control" name="societyProficiency" value="0"></td>
                        <td><input type="number" class="form-control" name="societyAbilityMod" value="0" readonly></td>
                        <td><input type="number" class="form-control" name="societyItemBonus" value="0"></td>
                        <td><input type="number" class="form-control" name="societyTotal" value="0" readonly></td>
                    </tr>
                    <tr>
                        <td>Stealth</td>
                        <td>Dexterity</td>
                        <td><input type="number" class="form-control" name="stealthProficiency" value="0"></td>
                        <td><input type="number" class="form-control" name="stealthAbilityMod" value="0" readonly></td>
                        <td><input type="number" class="form-control" name="stealthItemBonus" value="0"></td>
                        <td><input type="number" class="form-control" name="stealthTotal" value="0" readonly></td>
                    </tr>
                    <tr>
                        <td>Survival</td>
                        <td>Wisdom</td>
                        <td><input type="number" class="form-control" name="survivalProficiency" value="0"></td>
                        <td><input type="number" class="form-control" name="survivalAbilityMod" value="0" readonly></td>
                        <td><input type="number" class="form-control" name="survivalItemBonus" value="0"></td>
                        <td><input type="number" class="form-control" name="survivalTotal" value="0" readonly></td>
                    </tr>
                    <tr>
                        <td>Thievery</td>
                        <td>Dexterity</td>
                        <td><input type="number" class="form-control" name="thieveryProficiency" value="0"></td>
                        <td><input type="number" class="form-control" name="thieveryAbilityMod" value="0" readonly></td>
                        <td><input type="number" class="form-control" name="thieveryItemBonus" value="0"></td>
                        <td><input type="number" class="form-control" name="thieveryTotal" value="0" readonly></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`;

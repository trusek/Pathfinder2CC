export const basicInfoTemplate = `
    <div class="tab-pane fade show active" id="basic">
        <div class="form-section">
            <h3 class="section-title">Basic Information</h3>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Character Name</label>
                    <input type="text" class="form-control" name="name" required>
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Player Name</label>
                    <input type="text" class="form-control" name="playerName">
                </div>
            </div>

            <div class="row">
                <div class="col-md-4 mb-3">
                    <label class="form-label">Ancestry and Heritage</label>
                    <select class="form-control" name="ancestry">
                        <option value="">Select Ancestry</option>
                        <option value="dwarf">Dwarf</option>
                        <option value="elf">Elf</option>
                        <option value="gnome">Gnome</option>
                        <option value="goblin">Goblin</option>
                        <option value="halfling">Halfling</option>
                        <option value="human">Human</option>
                        <!-- Add more ancestries as needed -->
                    </select>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Background</label>
                    <select class="form-control" name="background">
                        <option value="">Select Background</option>
                        <option value="acolyte">Acolyte</option>
                        <option value="artisan">Artisan</option>
                        <option value="entertainer">Entertainer</option>
                        <option value="merchant">Merchant</option>
                        <option value="scholar">Scholar</option>
                        <!-- Add more backgrounds as needed -->
                    </select>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Class</label>
                    <select class="form-control" name="class">
                        <option value="">Select Class</option>
                        <option value="alchemist">Alchemist</option>
                        <option value="barbarian">Barbarian</option>
                        <option value="bard">Bard</option>
                        <option value="champion">Champion</option>
                        <option value="cleric">Cleric</option>
                        <option value="druid">Druid</option>
                        <option value="fighter">Fighter</option>
                        <option value="monk">Monk</option>
                        <option value="ranger">Ranger</option>
                        <option value="rogue">Rogue</option>
                        <option value="sorcerer">Sorcerer</option>
                        <option value="wizard">Wizard</option>
                        <!-- Add more classes as needed -->
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="col-md-3 mb-3">
                    <label class="form-label">Size</label>
                    <select class="form-control" name="size">
                        <option value="tiny">Tiny</option>
                        <option value="small">Small</option>
                        <option value="medium" selected>Medium</option>
                        <option value="large">Large</option>
                        <option value="huge">Huge</option>
                    </select>
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">Alignment</label>
                    <select class="form-control" name="alignment">
                        <option value="lg">Lawful Good</option>
                        <option value="ng">Neutral Good</option>
                        <option value="cg">Chaotic Good</option>
                        <option value="ln">Lawful Neutral</option>
                        <option value="n">Neutral</option>
                        <option value="cn">Chaotic Neutral</option>
                        <option value="le">Lawful Evil</option>
                        <option value="ne">Neutral Evil</option>
                        <option value="ce">Chaotic Evil</option>
                    </select>
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">Traits</label>
                    <input type="text" class="form-control" name="traits" placeholder="e.g., Human, Humanoid">
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">Deity</label>
                    <input type="text" class="form-control" name="deity">
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-3">
                    <label class="form-label">Level</label>
                    <input type="number" class="form-control" name="level" value="1" min="1" max="20">
                </div>
                <div class="col-md-6 mb-3">
                    <label class="form-label">Hero Points</label>
                    <input type="number" class="form-control" name="heroPoints" value="0" min="0" max="3">
                </div>
            </div>

            <div class="row">
                <div class="col-md-12 mb-3">
                    <label class="form-label">Experience Points (XP)</label>
                    <input type="number" class="form-control" name="experiencePoints" value="0" min="0">
                </div>
            </div>
        </div>

        <div class="form-section">
            <h3 class="section-title">Ability Scores</h3>
            <div class="row">
                <div class="col-md-4 col-6 mb-3">
                    <label class="form-label">Strength</label>
                    <div class="input-group">
                        <input type="number" class="form-control base-ability" name="strength" value="10" data-ability="strength">
                        <input type="number" class="form-control ancestry-bonus" readonly data-ability="strength" value="0">
                        <input type="number" class="form-control background-bonus" readonly data-ability="strength" value="0">
                        <input type="number" class="form-control class-bonus" readonly data-ability="strength" value="0">
                        <input type="number" class="form-control total-ability" readonly data-ability="strength" value="10">
                    </div>
                </div>
                <div class="col-md-4 col-6 mb-3">
                    <label class="form-label">Dexterity</label>
                    <div class="input-group">
                        <input type="number" class="form-control base-ability" name="dexterity" value="10" data-ability="dexterity">
                        <input type="number" class="form-control ancestry-bonus" readonly data-ability="dexterity" value="0">
                        <input type="number" class="form-control background-bonus" readonly data-ability="dexterity" value="0">
                        <input type="number" class="form-control class-bonus" readonly data-ability="dexterity" value="0">
                        <input type="number" class="form-control total-ability" readonly data-ability="dexterity" value="10">
                    </div>
                </div>
                <div class="col-md-4 col-6 mb-3">
                    <label class="form-label">Constitution</label>
                    <div class="input-group">
                        <input type="number" class="form-control base-ability" name="constitution" value="10" data-ability="constitution">
                        <input type="number" class="form-control ancestry-bonus" readonly data-ability="constitution" value="0">
                        <input type="number" class="form-control background-bonus" readonly data-ability="constitution" value="0">
                        <input type="number" class="form-control class-bonus" readonly data-ability="constitution" value="0">
                        <input type="number" class="form-control total-ability" readonly data-ability="constitution" value="10">
                    </div>
                </div>
                <div class="col-md-4 col-6 mb-3">
                    <label class="form-label">Intelligence</label>
                    <div class="input-group">
                        <input type="number" class="form-control base-ability" name="intelligence" value="10" data-ability="intelligence">
                        <input type="number" class="form-control ancestry-bonus" readonly data-ability="intelligence" value="0">
                        <input type="number" class="form-control background-bonus" readonly data-ability="intelligence" value="0">
                        <input type="number" class="form-control class-bonus" readonly data-ability="intelligence" value="0">
                        <input type="number" class="form-control total-ability" readonly data-ability="intelligence" value="10">
                    </div>
                </div>
                <div class="col-md-4 col-6 mb-3">
                    <label class="form-label">Wisdom</label>
                    <div class="input-group">
                        <input type="number" class="form-control base-ability" name="wisdom" value="10" data-ability="wisdom">
                        <input type="number" class="form-control ancestry-bonus" readonly data-ability="wisdom" value="0">
                        <input type="number" class="form-control background-bonus" readonly data-ability="wisdom" value="0">
                        <input type="number" class="form-control class-bonus" readonly data-ability="wisdom" value="0">
                        <input type="number" class="form-control total-ability" readonly data-ability="wisdom" value="10">
                    </div>
                </div>
                <div class="col-md-4 col-6 mb-3">
                    <label class="form-label">Charisma</label>
                    <div class="input-group">
                        <input type="number" class="form-control base-ability" name="charisma" value="10" data-ability="charisma">
                        <input type="number" class="form-control ancestry-bonus" readonly data-ability="charisma" value="0">
                        <input type="number" class="form-control background-bonus" readonly data-ability="charisma" value="0">
                        <input type="number" class="form-control class-bonus" readonly data-ability="charisma" value="0">
                        <input type="number" class="form-control total-ability" readonly data-ability="charisma" value="10">
                    </div>
                </div>
            </div>
        </div>
    </div>`;

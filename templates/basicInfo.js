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

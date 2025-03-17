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
                <!-- ... pozostałe pola basic info ... -->
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
                <!-- ... pozostałe ability scores ... -->
            </div>
        </div>
    </div>`;

export const combatTemplate = `
    <div class="tab-pane fade" id="combat">
        <div class="row">
            <div class="col-md-6">
                <div class="armor-class-box">
                    <h4>Armor Class</h4>
                    <!-- ... AC fields ... -->
                </div>
            </div>
            <div class="col-md-6">
                <div class="hit-points-box">
                    <h4>Hit Points</h4>
                    <!-- ... HP fields ... -->
                </div>
            </div>
        </div>
        <!-- ... saving throws ... -->
    </div>`;

export const skillsTemplate = `
    <div class="tab-pane fade" id="skills">
        <div class="form-section">
            <h3 class="section-title">Skills</h3>
            <!-- ... skills table ... -->
        </div>
    </div>`;

export const featsTemplate = `
    <div class="tab-pane fade" id="feats">
        <div class="form-section">
            <h3 class="section-title">Feats & Features</h3>
            
            <!-- Ancestry Feats -->
            <div class="mb-4">
                <h4 class="mb-3">Ancestry Feats</h4>
                <div id="ancestryFeatsContainer">
                    <div class="feat-template d-none">
                        <div class="card mb-3">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4 mb-2">
                                        <input type="text" class="form-control" placeholder="Feat Name" name="ancestryFeatName[]">
                                    </div>
                                    <div class="col-md-2 mb-2">
                                        <input type="number" class="form-control" placeholder="Level" name="ancestryFeatLevel[]" min="1">
                                    </div>
                                    <div class="col-md-5 mb-2">
                                        <textarea class="form-control" placeholder="Description" name="ancestryFeatDesc[]" rows="2"></textarea>
                                    </div>
                                    <div class="col-md-1 mb-2 d-flex align-items-center">
                                        <button type="button" class="btn btn-danger remove-feat"><i class="bi bi-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-primary" id="addAncestryFeat">Add Ancestry Feat</button>
            </div>

            <!-- ... pozostałe sekcje feat ... -->
        </div>
    </div>`;

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

            <!-- Class Feats -->
            <div class="mb-4">
                <h4 class="mb-3">Class Feats</h4>
                <div id="classFeatsContainer">
                    <div class="feat-template d-none">
                        <div class="card mb-3">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4 mb-2">
                                        <input type="text" class="form-control" placeholder="Feat Name" name="classFeatName[]">
                                    </div>
                                    <div class="col-md-2 mb-2">
                                        <input type="number" class="form-control" placeholder="Level" name="classFeatLevel[]" min="1">
                                    </div>
                                    <div class="col-md-5 mb-2">
                                        <textarea class="form-control" placeholder="Description" name="classFeatDesc[]" rows="2"></textarea>
                                    </div>
                                    <div class="col-md-1 mb-2 d-flex align-items-center">
                                        <button type="button" class="btn btn-danger remove-feat"><i class="bi bi-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-primary" id="addClassFeat">Add Class Feat</button>
            </div>

            <!-- Skill Feats -->
            <div class="mb-4">
                <h4 class="mb-3">Skill Feats</h4>
                <div id="skillFeatsContainer">
                    <div class="feat-template d-none">
                        <div class="card mb-3">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4 mb-2">
                                        <input type="text" class="form-control" placeholder="Feat Name" name="skillFeatName[]">
                                    </div>
                                    <div class="col-md-2 mb-2">
                                        <input type="number" class="form-control" placeholder="Level" name="skillFeatLevel[]" min="1">
                                    </div>
                                    <div class="col-md-5 mb-2">
                                        <textarea class="form-control" placeholder="Description" name="skillFeatDesc[]" rows="2"></textarea>
                                    </div>
                                    <div class="col-md-1 mb-2 d-flex align-items-center">
                                        <button type="button" class="btn btn-danger remove-feat"><i class="bi bi-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-primary" id="addSkillFeat">Add Skill Feat</button>
            </div>

            <!-- General Feats -->
            <div class="mb-4">
                <h4 class="mb-3">General Feats</h4>
                <div id="generalFeatsContainer">
                    <div class="feat-template d-none">
                        <div class="card mb-3">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4 mb-2">
                                        <input type="text" class="form-control" placeholder="Feat Name" name="generalFeatName[]">
                                    </div>
                                    <div class="col-md-2 mb-2">
                                        <input type="number" class="form-control" placeholder="Level" name="generalFeatLevel[]" min="1">
                                    </div>
                                    <div class="col-md-5 mb-2">
                                        <textarea class="form-control" placeholder="Description" name="generalFeatDesc[]" rows="2"></textarea>
                                    </div>
                                    <div class="col-md-1 mb-2 d-flex align-items-center">
                                        <button type="button" class="btn btn-danger remove-feat"><i class="bi bi-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-primary" id="addGeneralFeat">Add General Feat</button>
            </div>

            <!-- Class Features -->
            <div class="mb-4">
                <h4 class="mb-3">Class Features</h4>
                <div id="classFeaturesContainer">
                    <div class="feature-template d-none">
                        <div class="card mb-3">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-4 mb-2">
                                        <input type="text" class="form-control" placeholder="Feature Name" name="classFeatureName[]">
                                    </div>
                                    <div class="col-md-2 mb-2">
                                        <input type="number" class="form-control" placeholder="Level" name="classFeatureLevel[]" min="1">
                                    </div>
                                    <div class="col-md-5 mb-2">
                                        <textarea class="form-control" placeholder="Description" name="classFeatureDesc[]" rows="2"></textarea>
                                    </div>
                                    <div class="col-md-1 mb-2 d-flex align-items-center">
                                        <button type="button" class="btn btn-danger remove-feature"><i class="bi bi-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-primary" id="addClassFeature">Add Class Feature</button>
            </div>
        </div>
    </div>`;

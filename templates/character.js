export const characterTemplate = `
    <div class="tab-pane fade" id="character">
        <div class="form-section">
            <h3 class="section-title">Character Details</h3>
            
            <!-- Appearance -->
            <div class="card mb-4">
                <div class="card-header">
                    <h4 class="mb-0">Appearance</h4>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3 mb-3">
                            <label class="form-label">Age</label>
                            <input type="number" class="form-control" name="age">
                        </div>
                        <div class="col-md-3 mb-3">
                            <label class="form-label">Gender</label>
                            <input type="text" class="form-control" name="gender">
                        </div>
                        <div class="col-md-3 mb-3">
                            <label class="form-label">Height</label>
                            <input type="text" class="form-control" name="height">
                        </div>
                        <div class="col-md-3 mb-3">
                            <label class="form-label">Weight</label>
                            <input type="text" class="form-control" name="weight">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label class="form-label">Physical Description</label>
                            <textarea class="form-control" name="physicalDescription" rows="3"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Personality -->
            <div class="card mb-4">
                <div class="card-header">
                    <h4 class="mb-0">Personality</h4>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Personality Traits</label>
                            <textarea class="form-control" name="personalityTraits" rows="3"></textarea>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Ideals</label>
                            <textarea class="form-control" name="ideals" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Bonds</label>
                            <textarea class="form-control" name="bonds" rows="3"></textarea>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Flaws</label>
                            <textarea class="form-control" name="flaws" rows="3"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Background -->
            <div class="card mb-4">
                <div class="card-header">
                    <h4 class="mb-0">Background Story</h4>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label class="form-label">Character History</label>
                            <textarea class="form-control" name="characterHistory" rows="5"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Allies & Organizations</label>
                            <textarea class="form-control" name="alliesOrganizations" rows="3"></textarea>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Enemies</label>
                            <textarea class="form-control" name="enemies" rows="3"></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Additional Information -->
            <div class="card mb-4">
                <div class="card-header">
                    <h4 class="mb-0">Additional Information</h4>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Languages</label>
                            <textarea class="form-control" name="languages" rows="2"></textarea>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label class="form-label">Other Proficiencies</label>
                            <textarea class="form-control" name="otherProficiencies" rows="2"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label class="form-label">Notes</label>
                            <textarea class="form-control" name="notes" rows="4"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

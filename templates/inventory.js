export const inventoryTemplate = `
    <div class="tab-pane fade" id="inventory">
        <div class="form-section">
            <h3 class="section-title">Inventory</h3>
            
            <!-- Currency -->
            <div class="currency-section mb-4">
                <h4>Currency</h4>
                <div class="row">
                    <div class="col-md-3 mb-2">
                        <label class="form-label">Platinum (pp)</label>
                        <input type="number" class="form-control" name="platinumPieces" value="0" min="0">
                    </div>
                    <div class="col-md-3 mb-2">
                        <label class="form-label">Gold (gp)</label>
                        <input type="number" class="form-control" name="goldPieces" value="0" min="0">
                    </div>
                    <div class="col-md-3 mb-2">
                        <label class="form-label">Silver (sp)</label>
                        <input type="number" class="form-control" name="silverPieces" value="0" min="0">
                    </div>
                    <div class="col-md-3 mb-2">
                        <label class="form-label">Copper (cp)</label>
                        <input type="number" class="form-control" name="copperPieces" value="0" min="0">
                    </div>
                </div>
            </div>

            <!-- Carried Items -->
            <div class="items-section">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4>Items</h4>
                    <div>
                        <span class="me-3">
                            Total Bulk: <span id="totalBulk">0</span>
                        </span>
                        <button type="button" class="btn btn-primary" onclick="addItem()">Add Item</button>
                    </div>
                </div>
                
                <!-- Item Categories -->
                <ul class="nav nav-tabs mb-3" id="itemTabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="worn-tab" data-bs-toggle="tab" data-bs-target="#worn" type="button" role="tab">
                            Worn
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="readied-tab" data-bs-toggle="tab" data-bs-target="#readied" type="button" role="tab">
                            Readied
                        </button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="other-tab" data-bs-toggle="tab" data-bs-target="#other" type="button" role="tab">
                            Other
                        </button>
                    </li>
                </ul>

                <!-- Item Lists -->
                <div class="tab-content" id="itemTabContent">
                    <!-- Worn Items -->
                    <div class="tab-pane fade show active" id="worn" role="tabpanel">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>Bulk</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="wornItems">
                                    <!-- Worn items will be added here dynamically -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Readied Items -->
                    <div class="tab-pane fade" id="readied" role="tabpanel">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>Bulk</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="readiedItems">
                                    <!-- Readied items will be added here dynamically -->
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Other Items -->
                    <div class="tab-pane fade" id="other" role="tabpanel">
                        <div class="table-responsive">
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Quantity</th>
                                        <th>Bulk</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody id="otherItems">
                                    <!-- Other items will be added here dynamically -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

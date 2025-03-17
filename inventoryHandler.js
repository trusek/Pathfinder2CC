export class InventoryHandler {
    constructor() {
        this.items = {
            worn: [],
            readied: [],
            other: []
        };
    }

    setupEventListeners() {
        // Add listeners for currency inputs to update total value
        document.querySelectorAll('[name$="Pieces"]').forEach(input => {
            input.addEventListener('change', () => this.updateTotalValue());
        });
    }

    updateTotalValue() {
        const pp = parseInt(document.querySelector('[name="platinumPieces"]')?.value) || 0;
        const gp = parseInt(document.querySelector('[name="goldPieces"]')?.value) || 0;
        const sp = parseInt(document.querySelector('[name="silverPieces"]')?.value) || 0;
        const cp = parseInt(document.querySelector('[name="copperPieces"]')?.value) || 0;

        // Convert all to copper pieces for total
        const totalCp = (pp * 1000) + (gp * 100) + (sp * 10) + cp;

        // Convert back to highest possible denominations
        const newPp = Math.floor(totalCp / 1000);
        let remainder = totalCp % 1000;
        const newGp = Math.floor(remainder / 100);
        remainder = remainder % 100;
        const newSp = Math.floor(remainder / 10);
        const newCp = remainder % 10;

        // Update inputs
        document.querySelector('[name="platinumPieces"]').value = newPp;
        document.querySelector('[name="goldPieces"]').value = newGp;
        document.querySelector('[name="silverPieces"]').value = newSp;
        document.querySelector('[name="copperPieces"]').value = newCp;
    }

    updateTotalBulk() {
        let totalBulk = 0;
        
        // Calculate bulk from all categories
        Object.values(this.items).forEach(categoryItems => {
            categoryItems.forEach(item => {
                const bulk = parseFloat(item.bulk) || 0;
                const quantity = parseInt(item.quantity) || 1;
                totalBulk += bulk * quantity;
            });
        });

        // Update total bulk display
        const totalBulkSpan = document.getElementById('totalBulk');
        if (totalBulkSpan) {
            totalBulkSpan.textContent = totalBulk.toFixed(1);
        }
    }

    addItem() {
        const itemId = Date.now();
        const itemHtml = `
            <tr data-item-id="${itemId}">
                <td>
                    <input type="text" class="form-control" name="itemName_${itemId}">
                </td>
                <td>
                    <input type="number" class="form-control" name="itemQuantity_${itemId}" value="1" min="1" onchange="updateTotalBulk()">
                </td>
                <td>
                    <input type="number" class="form-control" name="itemBulk_${itemId}" value="0" step="0.1" min="0" onchange="updateTotalBulk()">
                </td>
                <td>
                    <div class="input-group">
                        <input type="number" class="form-control" name="itemPrice_${itemId}" value="0" min="0">
                        <select class="form-select" name="itemPriceDenomination_${itemId}">
                            <option value="cp">cp</option>
                            <option value="sp">sp</option>
                            <option value="gp" selected>gp</option>
                            <option value="pp">pp</option>
                        </select>
                    </div>
                </td>
                <td>
                    <div class="btn-group">
                        <button type="button" class="btn btn-outline-secondary" onclick="moveItem(${itemId}, 'worn')">Worn</button>
                        <button type="button" class="btn btn-outline-secondary" onclick="moveItem(${itemId}, 'readied')">Readied</button>
                        <button type="button" class="btn btn-outline-secondary" onclick="moveItem(${itemId}, 'other')">Other</button>
                        <button type="button" class="btn btn-danger" onclick="removeItem(${itemId})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;

        // Add to "other" by default
        const otherItemsList = document.getElementById('otherItems');
        if (otherItemsList) {
            otherItemsList.insertAdjacentHTML('beforeend', itemHtml);
            this.items.other.push({
                id: itemId,
                name: '',
                quantity: 1,
                bulk: 0,
                price: 0,
                priceDenomination: 'gp'
            });
        }

        this.updateTotalBulk();
    }

    removeItem(itemId) {
        // Remove from DOM
        const itemRow = document.querySelector(`tr[data-item-id="${itemId}"]`);
        if (itemRow) {
            itemRow.remove();
        }

        // Remove from data
        Object.keys(this.items).forEach(category => {
            this.items[category] = this.items[category].filter(item => item.id !== itemId);
        });

        this.updateTotalBulk();
    }

    moveItem(itemId, newCategory) {
        // Find the item's current category
        let currentCategory = null;
        let item = null;
        Object.entries(this.items).forEach(([category, items]) => {
            const foundItem = items.find(i => i.id === itemId);
            if (foundItem) {
                currentCategory = category;
                item = foundItem;
            }
        });

        if (!item || currentCategory === newCategory) return;

        // Remove from old category
        this.items[currentCategory] = this.items[currentCategory].filter(i => i.id !== itemId);

        // Add to new category
        this.items[newCategory].push(item);

        // Move DOM element
        const itemRow = document.querySelector(`tr[data-item-id="${itemId}"]`);
        const newList = document.getElementById(`${newCategory}Items`);
        if (itemRow && newList) {
            newList.appendChild(itemRow);
        }
    }

    getInventoryData() {
        return {
            currency: {
                pp: parseInt(document.querySelector('[name="platinumPieces"]')?.value) || 0,
                gp: parseInt(document.querySelector('[name="goldPieces"]')?.value) || 0,
                sp: parseInt(document.querySelector('[name="silverPieces"]')?.value) || 0,
                cp: parseInt(document.querySelector('[name="copperPieces"]')?.value) || 0
            },
            items: this.items
        };
    }

    loadInventoryData(data) {
        // Load currency
        if (data.currency) {
            document.querySelector('[name="platinumPieces"]').value = data.currency.pp || 0;
            document.querySelector('[name="goldPieces"]').value = data.currency.gp || 0;
            document.querySelector('[name="silverPieces"]').value = data.currency.sp || 0;
            document.querySelector('[name="copperPieces"]').value = data.currency.cp || 0;
        }

        // Clear existing items
        Object.keys(this.items).forEach(category => {
            const list = document.getElementById(`${category}Items`);
            if (list) {
                list.innerHTML = '';
            }
            this.items[category] = [];
        });

        // Load items
        if (data.items) {
            Object.entries(data.items).forEach(([category, items]) => {
                items.forEach(item => {
                    this.items[category].push(item);
                    const itemHtml = `
                        <tr data-item-id="${item.id}">
                            <td>
                                <input type="text" class="form-control" name="itemName_${item.id}" value="${item.name}">
                            </td>
                            <td>
                                <input type="number" class="form-control" name="itemQuantity_${item.id}" value="${item.quantity}" min="1" onchange="updateTotalBulk()">
                            </td>
                            <td>
                                <input type="number" class="form-control" name="itemBulk_${item.id}" value="${item.bulk}" step="0.1" min="0" onchange="updateTotalBulk()">
                            </td>
                            <td>
                                <div class="input-group">
                                    <input type="number" class="form-control" name="itemPrice_${item.id}" value="${item.price}" min="0">
                                    <select class="form-select" name="itemPriceDenomination_${item.id}">
                                        <option value="cp" ${item.priceDenomination === 'cp' ? 'selected' : ''}>cp</option>
                                        <option value="sp" ${item.priceDenomination === 'sp' ? 'selected' : ''}>sp</option>
                                        <option value="gp" ${item.priceDenomination === 'gp' ? 'selected' : ''}>gp</option>
                                        <option value="pp" ${item.priceDenomination === 'pp' ? 'selected' : ''}>pp</option>
                                    </select>
                                </div>
                            </td>
                            <td>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary" onclick="moveItem(${item.id}, 'worn')">Worn</button>
                                    <button type="button" class="btn btn-outline-secondary" onclick="moveItem(${item.id}, 'readied')">Readied</button>
                                    <button type="button" class="btn btn-outline-secondary" onclick="moveItem(${item.id}, 'other')">Other</button>
                                    <button type="button" class="btn btn-danger" onclick="removeItem(${item.id})">
                                        <i class="bi bi-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `;
                    const list = document.getElementById(`${category}Items`);
                    if (list) {
                        list.insertAdjacentHTML('beforeend', itemHtml);
                    }
                });
            });
        }

        this.updateTotalBulk();
    }
}

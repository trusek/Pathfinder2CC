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
                        <option value="half-elf">Half-Elf</option>
                        <option value="half-orc">Half-Orc</option>
                        <option value="hobgoblin">Hobgoblin</option>
                        <option value="leshy">Leshy</option>
                        <option value="lizardfolk">Lizardfolk</option>
                        <option value="orc">Orc</option>
                        <option value="ratfolk">Ratfolk</option>
                        <option value="tengu">Tengu</option>
                    </select>
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Background</label>
                    <select class="form-control" name="background">
                        <option value="">Select Background</option>
                        <option value="acolyte">Acolyte</option>
                        <option value="acrobat">Acrobat</option>
                        <option value="animal whisperer">Animal Whisperer</option>
                        <option value="artisan">Artisan</option>
                        <option value="artist">Artist</option>
                        <option value="barkeep">Barkeep</option>
                        <option value="bounty hunter">Bounty Hunter</option>
                        <option value="criminal">Criminal</option>
                        <option value="detective">Detective</option>
                        <option value="entertainer">Entertainer</option>
                        <option value="farmhand">Farmhand</option>
                        <option value="gladiator">Gladiator</option>
                        <option value="guard">Guard</option>
                        <option value="herbalist">Herbalist</option>
                        <option value="hermit">Hermit</option>
                        <option value="hunter">Hunter</option>
                        <option value="laborer">Laborer</option>
                        <option value="merchant">Merchant</option>
                        <option value="noble">Noble</option>
                        <option value="nomad">Nomad</option>
                        <option value="scholar">Scholar</option>
                        <option value="scout">Scout</option>
                        <option value="street urchin">Street Urchin</option>
                        <option value="warrior">Warrior</option>
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
                        <option value="gunslinger">Gunslinger</option>
                        <option value="inventor">Inventor</option>
                        <option value="investigator">Investigator</option>
                        <option value="magus">Magus</option>
                        <option value="monk">Monk</option>
                        <option value="oracle">Oracle</option>
                        <option value="ranger">Ranger</option>
                        <option value="rogue">Rogue</option>
                        <option value="sorcerer">Sorcerer</option>
                        <option value="summoner">Summoner</option>
                        <option value="swashbuckler">Swashbuckler</option>
                        <option value="witch">Witch</option>
                        <option value="wizard">Wizard</option>
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
                    <select class="form-control" name="traits" multiple>
                        <option value="aberration">Aberration</option>
                        <option value="aeon">Aeon</option>
                        <option value="air">Air</option>
                        <option value="amphibious">Amphibious</option>
                        <option value="angel">Angel</option>
                        <option value="aquatic">Aquatic</option>
                        <option value="archon">Archon</option>
                        <option value="azata">Azata</option>
                        <option value="beast">Beast</option>
                        <option value="celestial">Celestial</option>
                        <option value="cold">Cold</option>
                        <option value="construct">Construct</option>
                        <option value="daemon">Daemon</option>
                        <option value="demon">Demon</option>
                        <option value="devil">Devil</option>
                        <option value="dragon">Dragon</option>
                        <option value="earth">Earth</option>
                        <option value="elemental">Elemental</option>
                        <option value="ethereal">Ethereal</option>
                        <option value="evil">Evil</option>
                        <option value="fey">Fey</option>
                        <option value="fire">Fire</option>
                        <option value="fiend">Fiend</option>
                        <option value="fungus">Fungus</option>
                        <option value="giant">Giant</option>
                        <option value="good">Good</option>
                        <option value="humanoid">Humanoid</option>
                        <option value="incorporeal">Incorporeal</option>
                        <option value="lawful">Lawful</option>
                        <option value="monitor">Monitor</option>
                        <option value="mortal">Mortal</option>
                        <option value="negative">Negative</option>
                        <option value="ooze">Ooze</option>
                        <option value="plant">Plant</option>
                        <option value="positive">Positive</option>
                        <option value="protean">Protean</option>
                        <option value="psychopomp">Psychopomp</option>
                        <option value="shadow">Shadow</option>
                        <option value="spirit">Spirit</option>
                        <option value="swarm">Swarm</option>
                        <option value="undead">Undead</option>
                        <option value="water">Water</option>
                    </select>
                    <small class="form-text text-muted">Hold Ctrl/Cmd to select multiple traits</small>
                </div>
                <div class="col-md-3 mb-3">
                    <label class="form-label">Deity</label>
                    <select class="form-control" name="deity">
                        <option value="">Select Deity</option>
                        <optgroup label="Core Deities">
                            <option value="abadar">Abadar (LN) - Cities, Law, Wealth</option>
                            <option value="asmodeus">Asmodeus (LE) - Contracts, Pride, Tyranny</option>
                            <option value="calistria">Calistria (CN) - Lust, Revenge, Trickery</option>
                            <option value="cayden">Cayden Cailean (CG) - Ale, Freedom, Wine</option>
                            <option value="desna">Desna (CG) - Dreams, Luck, Stars, Travel</option>
                            <option value="erastil">Erastil (LG) - Family, Farming, Hunting</option>
                            <option value="gorum">Gorum (CN) - Battle, Strength, War</option>
                            <option value="gozreh">Gozreh (N) - Nature, Sea, Weather</option>
                            <option value="iomedae">Iomedae (LG) - Honor, Justice, Valor</option>
                            <option value="irori">Irori (LN) - History, Knowledge, Self-Perfection</option>
                            <option value="lamashtu">Lamashtu (CE) - Madness, Monsters, Nightmares</option>
                            <option value="nethys">Nethys (N) - Magic</option>
                            <option value="norgorber">Norgorber (NE) - Greed, Murder, Secrets</option>
                            <option value="pharasma">Pharasma (N) - Birth, Death, Fate, Prophecy</option>
                            <option value="rovagug">Rovagug (CE) - Destruction, Disaster, Wrath</option>
                            <option value="sarenrae">Sarenrae (NG) - Healing, Honesty, Sun</option>
                            <option value="shelyn">Shelyn (NG) - Art, Beauty, Love, Music</option>
                            <option value="torag">Torag (LG) - Forge, Protection, Strategy</option>
                            <option value="urgathoa">Urgathoa (NE) - Disease, Gluttony, Undeath</option>
                            <option value="zon-kuthon">Zon-Kuthon (LE) - Darkness, Envy, Loss, Pain</option>
                        </optgroup>
                        <optgroup label="Other Deities">
                            <option value="achaekek">Achaekek (LE) - Assassination, Law</option>
                            <option value="alseta">Alseta (LN) - Doors, Portals, Transitions</option>
                            <option value="apsu">Apsu (LG) - Dragons, Honor, Scales</option>
                            <option value="aroden">Aroden (Dead) - Human Culture, Innovation</option>
                            <option value="besmara">Besmara (CN) - Piracy, Strife</option>
                            <option value="brigh">Brigh (N) - Invention</option>
                            <option value="dahak">Dahak (CE) - Destruction, Dragons</option>
                            <option value="ghlaunder">Ghlaunder (CE) - Infection, Parasites</option>
                            <option value="groetus">Groetus (CN) - Empty Places, Ruins</option>
                            <option value="kurgess">Kurgess (NG) - Competition, Sport</option>
                            <option value="milani">Milani (CG) - Hope, Uprisings</option>
                            <option value="sivanah">Sivanah (N) - Illusions, Reflections</option>
                        </optgroup>
                        <option value="atheist">Atheist/No Deity</option>
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4 mb-3">
                    <label class="form-label">Level</label>
                    <input type="number" class="form-control" name="level" value="1" min="1" max="20">
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Experience Points</label>
                    <input type="number" class="form-control" name="xp" value="0" min="0">
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label">Hero Points</label>
                    <input type="number" class="form-control" name="heroPoints" value="1" min="0" max="3">
                </div>
            </div>

            <h3 class="section-title">Ability Scores</h3>
            <div class="table-responsive">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Ability</th>
                            <th>Base Score</th>
                            <th>Ancestry</th>
                            <th>Background</th>
                            <th>Class</th>
                            <th class="fw-bold">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Strength</td>
                            <td><input type="number" class="form-control form-control-sm" name="strength_score" value="10" min="1"></td>
                            <td><input type="number" class="form-control form-control-sm text-center" name="strength_ancestry_bonus" value="0" readonly></td>
                            <td><input type="number" class="form-control form-control-sm text-center" name="strength_background_bonus" value="0" readonly></td>
                            <td><input type="number" class="form-control form-control-sm text-center" name="strength_class_bonus" value="0" readonly></td>
                            <td><input type="number" class="form-control form-control-sm fw-bold" name="strength_total" value="10" readonly></td>
                        </tr>
                        <tr>
                            <td>Dexterity</td>
                            <td><input type="number" class="form-control form-control-sm" name="dexterity_score" value="10" min="1"></td>
                            <td><input type="number" class="form-control form-control-sm text-center" name="dexterity_ancestry_bonus" value="0" readonly></td>
                            <td><input type="number" class="form-control form-control-sm text-center" name="dexterity_background_bonus" value="0" readonly></td>
                            <td><input type="number" class="form-control form-control-sm text-center" name="dexterity_class_bonus" value="0" readonly></td>
                            <td><input type="number" class="form-control form-control-sm fw-bold" name="dexterity_total" value="10" readonly></td>
                        </tr>
                        <tr>
                            <td>Constitution</td>
                            <td><input type="number" class="form-control form-control-sm" name="constitution_score" value="10" min="1"></td>
                            <td><input type="number" class="form-control form-control-sm text-center" name="constitution_ancestry_bonus" value="0" readonly></td>
                            <td><input type="number" class="form-control form-control-sm text-center" name="constitution_background_bonus" value="0" readonly></td>
                            <td><input type="number" class="form-control form-control-sm text-center" name="constitution_class_bonus" value="0" readonly></td>
                            <td><input type="number" class="form-control form-control-sm fw-bold" name="constitution_total" value="10" readonly></td>
                        </tr>
                        <tr>
                            <td>Intelligence</td>
                            <td><input type="number" class="form-control form-control-sm" name="intelligence_score" value="10" min="1"></td>
                            <td><input type="number" class="form-control form-control-sm text-center" name="intelligence_ancestry_bonus" value="0" readonly></td>
                            <td><input type="number" class="form-control form-control-sm text-center" name="intelligence_background_bonus" value="0" readonly></td>
                            <td><input type="number" class="form-control form-control-sm text-center" name="intelligence_class_bonus" value="0" readonly></td>
                            <td><input type="number" class="form-control form-control-sm fw-bold" name="intelligence_total" value="10" readonly></td>
                        </tr>
                        <tr>
                            <td>Wisdom</td>
                            <td><input type="number" class="form-control form-control-sm" name="wisdom_score" value="10" min="1"></td>
                            <td><input type="number" class="form-control form-control-sm text-center" name="wisdom_ancestry_bonus" value="0" readonly></td>
                            <td><input type="number" class="form-control form-control-sm text-center" name="wisdom_background_bonus" value="0" readonly></td>
                            <td><input type="number" class="form-control form-control-sm text-center" name="wisdom_class_bonus" value="0" readonly></td>
                            <td><input type="number" class="form-control form-control-sm fw-bold" name="wisdom_total" value="10" readonly></td>
                        </tr>
                        <tr>
                            <td>Charisma</td>
                            <td><input type="number" class="form-control form-control-sm" name="charisma_score" value="10" min="1"></td>
                            <td><input type="number" class="form-control form-control-sm text-center" name="charisma_ancestry_bonus" value="0" readonly></td>
                            <td><input type="number" class="form-control form-control-sm text-center" name="charisma_background_bonus" value="0" readonly></td>
                            <td><input type="number" class="form-control form-control-sm text-center" name="charisma_class_bonus" value="0" readonly></td>
                            <td><input type="number" class="form-control form-control-sm fw-bold" name="charisma_total" value="10" readonly></td>
                        </tr>
                    </tbody>
                </table>
                <div id="totalPointsWarning" class="alert alert-danger d-none">
                    Total ability scores cannot exceed 80 points at level 1
                </div>
                <div class="mt-2">
                    <strong>Selected Traits:</strong> <span id="selectedTraits">None</span>
                </div>
            </div>

            <style>
                .form-control-sm {
                    min-height: calc(1.5em + 0.5rem + 2px);
                    padding: 0.25rem 0.5rem;
                    font-size: 0.875rem;
                    border-radius: 0.2rem;
                }
            </style>
        </div>
    </div>
`;

const defaultToolbox = {
    kind: "categoryToolbox",
    id: "easyBloqsToolbox",
    contents: [
        {
            kind: "category",
            name: "%{BKY_LEAPHY_SITUATION_CATEGORY}",
            id: "l_situation",
            toolboxitemid: "l_situation",
            categorystyle: "situation_category",
            contents: [
                {
                    kind: "block",
                    type: "time_delay",
                    blockxml: `<block type="time_delay">
            <value name="DELAY_TIME_MILI">
              <shadow type="math_number">
                <field name="NUM">1000</field>
              </shadow>
            </value>
          </block>`
                },
                {
                    kind: "block",
                    type: "logic_compare",
                },
            ],
        }
    ],
};

function getToolbox() {
    return defaultToolbox;
}

export { getToolbox };
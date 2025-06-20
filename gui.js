// register("step", () => {
//
// }.setFps(20)

let mainText = "&7Engineer &cModules"
let inGui = false
let mainGui = new Gui()

const resetColors = () => buttons.forEach(button => button.color = 0x88000000)

const openCatagory = cat => ChatLib.command(cat, true)

let buttons = [
    {
        text: "&a/misc",
        open: () => openCatagory("misc"),
        position: [
            Renderer.screen.getWidth() / 2.424,
            Renderer.screen.getHeight() / 3.7,
        ],
    },
    {
        text: "&b/splits",
        open: () => openCatagory("splits"),
        position: [
            Renderer.screen.getWidth() / 2.424,
            Renderer.screen.getHeight() / 2.7,
        ],
    },
    {
        text: "&c/terms",
        open: () => openCatagory("terms"),
        position: [
            Renderer.screen.getWidth() / 2.424,
            Renderer.screen.getHeight() / 2.13,
        ],
    },
]

const inRect = (x, y, bx, by, bw, bh) => (x >= bx && x <= bx + bw && y >= by && y <= by + bh)

guiClicked = register("guiMouseClick", (x, y, bn) => {
    console.log(`: ${bn}`)
    buttons.forEach(button => {
        const [bx, by] = button.position
        const bw = 170
        const bh = 50
        if (inRect(x, y, bx, by, bw, bh)) button.open()
    })
}).unregister()

// ChatLib.chat(Client.getMouseX())

const renderMain = register("renderOverlay", () => {
    Renderer.drawRect(0x88000000, 0, 0, 999, 999)
    new Text(mainText, Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 5)
        .setShadow(true).setScale(2).setAlign("center").draw()
    buttons.forEach((button, index) => {
        const x = Client.getMouseX()
        const y = Client.getMouseY()
        const [bx, by] = button.position
        const bw = 170
        const bh = 50
        if (inRect(x, y, bx, by, bw, bh)) {
            resetColors()
            button.color = 0xAA000000
        } else { button.color = 0x88000000 }

        Renderer.drawRect(button.color, button.position[0], button.position[1], 170, 50)
    })
    buttons.forEach((button, index) => new Text(button.text, button.position[0] + 85, button.position[1] + 17).setShadow(true).setScale(1.5).setAlign("center").draw())

    // Renderer.drawRect(0xCC222222, Renderer.screen.getWidth() / 2.424, Renderer.screen.getHeight() / 3.7, 170, 50)
    // buttons.forEach((button, index) => new Text(button.text, button.position[0] + 85, button.position[1] + ).setShadow(true).setScale(1.5).setAlign("center").draw())
    // Renderer.drawRect(0xCC222222, Renderer.screen.getWidth() / 2.424, Renderer.screen.getHeight() / 2.13, 170, 50)
}).unregister()

register("guiClosed", () => {
    if (!inGui) return
    inGui = false
    renderMain.unregister()
    guiClicked.unregister()
})

register("command", () => {
    setTimeout(() => inGui = true, 200)
    mainGui.open()
    renderMain.register()
    guiClicked.register()
}).setName("em")

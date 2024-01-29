import chroma from "chroma-js";


const colors = {
    foreground:"#032541",
    background: "#dfe6e9",
    backgroundSecondary: "#ffffff",
    accent: "#82B1FF",
    error: "#FF5252",
    info: "#2196F3",
    success: "#4CAF50",
    warning: "#FFC107",
}

export default {
    breakpoints: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1280px",
    },
    colors: {
        ...colors,
        shadow: chroma(colors.foreground).alpha(0.2).css(),
    },
} 
module.exports = {
    status: function (queue) {

        let volume = queue.volume;
        let filter = queue.filter || "Off";
        let loop = queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off";
        let autoplay = queue.autoplay ? "On" : "Off";

        let status;
        let footer

        if (filter !== "Off" && loop === "Off" && autoplay === "Off") {
            status = `Filter: ${filter}`;
        }
        else if (filter !== "Off" && loop !== "Off" && autoplay === "Off") {
            status = `Filter: ${filter} | Loop: ${loop}`;
        }
        else if (filter !== "Off" && loop !== "Off" && autoplay !== "Off") {
            status = `Filter: ${filter} | Loop: ${loop} | Autoplay: ${autoplay}`;
        }
        else if (filter === "Off" && loop !== "Off" && autoplay !== "Off") {
            status = `Loop: ${loop} | Autoplay: ${autoplay}`;
        }
        else if (filter === "Off" && loop === "Off" && autoplay !== "Off") {
            status = `Autoplay: ${autoplay}`;
        }
        else if (filter === "Off" && loop === "Off" && autoplay === "Off") {
            status = null;
        }

        if (!status) {
            footer = `Volume: ${volume}%`;
        } else {
            footer = `Volume: ${volume}% | ${status}`;
        }

        return footer;
    }
}
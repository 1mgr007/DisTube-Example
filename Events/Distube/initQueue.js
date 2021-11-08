module.exports = async (client, queue) => {

    queue.autoplay = false;
    queue.volume = 50;
	queue.voice.setSelfDeaf(true);

}
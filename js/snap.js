disintegrate.init();

$("#image").on('click', e=>{
    const disObj = disintegrate.getDisObj(e.target);
    disintegrate.createSimultaneousParticles(disObj);
    e.target.remove();
    $('#content').css('display', 'block');
});


//declare a new disintegrate obj
const thanosSnap = function() {
    this.name = 'ThanosSnap';
    this.animationDuration = 3000;
    this.size = 3;
    //changes the x-axis direction after click
    // - goes left
    this.speedX = Math.random() * 3;
    //changes the y-axis direction after click
    // - goes up
    this.speedY = Math.random() * (-4);
    this.first = true;
    this.draw = (ctx, percentComplete) => {
        if (this.first) {
            this.startX += (Math.random() - 0.5) * 10;
            this.startY += (Math.random() - 0.5) * 10;
            this.first = false;
        }
        ctx.beginPath();
        ctx.fillRect(this.startX - this.size / 2, this.startY - this.size /2,
            this.size, this.size);
        const r = this.rgbArray[0];
        const g = this.rgbArray[1];
        const b = this.rgbArray[2];
        const a = 1 - percentComplete;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
        ctx.fill();
        //determines how fast you want the object to disappear
        this.speedX *= 1.01;
        this.speedY *= 1.01;
        this.size *= 0.95;
        this.startX += this.speedX;
        this.startY += this.speedY;
    }
};

disintegrate.addParticleType(thanosSnap);
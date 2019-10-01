let nums = [0x7E, 0x30, 0x6D, 0x79, 0x33, 0x5B, 0x5F, 0x70, 0x7F, 0x7B, 0x77, 0x1F, 0x4E, 0x3D, 0x4F, 0x47];
let index = 0;

function setup() {
	createCanvas(window.innerWidth, window.innerHeight);
	background(0);
	frameRate(1);
}

function draw() {
	background(0);
	translate(window.innerWidth / 2.5, window.innerHeight / 3);
	sevenSeg(nums[index]);
	index = (index + 1) % 16;
}

function getColor(val, shift) {
	let r = 255;
	let g = 40;
	let b = 40;
	let a = 255 * ((val >> shift) & 1);
	return color(r, g, b, a);

}

function sevenSeg(val) {
	push();
	noFill();
	//A
	fill(255, 40, 40, (255 * ((val >> 6) & 1)));
	rect(60, 40, 80, 20, 20);
	//B
	fill(255, 40, 40, (255 * ((val >> 5) & 1)));
	rect(135, 60, 20, 80, 20);
	//C
	fill(255, 40, 40, (255 * ((val >> 4) & 1)));
	rect(135, 160, 20, 80, 20);
	//D
	fill(255, 40, 40, (255 * ((val >> 3) & 1)));
	rect(60, 240, 80, 20, 80);
	//E
	fill(255, 40, 40, (255 * ((val >> 2) & 1)));
	rect(45, 160, 20, 80, 20);
	//F
	fill(255, 40, 40, (255 * ((val >> 1) & 1)));
	rect(45, 60, 20, 80, 20);
	//G
	fill(255, 40, 40, (255 * ((val >> 0) & 1)));
	rect(60, 140, 80, 20, 20);
	pop();
}
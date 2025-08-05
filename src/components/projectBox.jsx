import SizeBox from "./sizeBox"

export default function ProjectBox({ startSize = 30, title = "null", description = "null" }) {
    return <div>
        <SizeBox h={startSize} />
        <p className="text-white font-bold text-2xl mb-0 hover:text-[#00ffff] hover:underline transition-colors duration-300 cursor-pointer w-max">{title}</p>

        <SizeBox h={20} />
        <p className="font-bold text-[#bfbfbf] mb-0">{description}</p>

        <SizeBox h={10} />
        <a href="#" className="text-white font-bold hover:text-[#cce6ff] hover:animate-pulse cursor-pointer w-max">Read more</a>
    </div>
}
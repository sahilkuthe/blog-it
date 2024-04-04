import { AppBar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"

export const Blogs = () => {
    return <div>
        <div>
            <AppBar />
        </div>


        < div className = "flex justify-center bg-orange-100 h-screen" >
            <div className="max-w-2xl">

        
                <BlogCard avatar="./src/assets/luffy.jpg" authorName="Monkey D. Luffy" publishedDate="Dec 3 2023" title="The Power of Dreams" content="In a world where dreams drive us forward, Monkey D. Luffy sets sail with his crew, the Straw Hat Pirates, on a quest for the ultimate treasure, One Piece. Along the way, they encounter allies, enemies, and uncover the true meaning of friendship and adventure." />

                <BlogCard avatar="./src/assets/zoro.jpg" authorName="Roronoa Zoro" publishedDate="Aug 15 2023" title="The Way of the Sword" content="Roronoa Zoro, master swordsman of the Straw Hat Pirates, embodies the code of bushido as he seeks to become the world's greatest swordsman. With his unmatched skill and unwavering determination, he slices through obstacles on his journey to perfect his swordsmanship." />

                <BlogCard avatar="./src/assets/nami.jpg" authorName="Nami" publishedDate="May 22 2023" title="Navigating the Grand Line" content="Nami, the skilled navigator of the Straw Hat Pirates, charts a course through treacherous seas and mysterious islands in pursuit of One Piece. With her expertise in cartography and meteorology, she leads her crewmates to new horizons while outwitting dangerous foes." />

                <BlogCard avatar="./src/assets/ussop.png" authorName="Usopp" publishedDate="Oct 9 2023" title="Tales of Bravery" content="Usopp, the brave sniper of the Straw Hat Pirates, spins tales of valor and courage as he faces his fears head-on. With his trusty slingshot and a heart full of determination, he proves that even the most unlikely hero can stand tall in the face of adversity." />

                <BlogCard avatar="./src/assets/sanji.png" authorName="Sanji" publishedDate="Feb 28 2023" title="Culinary Adventures" content="Sanji, the culinary genius of the Straw Hat Pirates, whips up delectable dishes that satisfy both hunger and soul. With his passion for cooking and chivalrous spirit, he spreads joy and warmth to his crewmates while seeking out the finest ingredients on their journey." />
                </div>
            </div>
        </div>
} 
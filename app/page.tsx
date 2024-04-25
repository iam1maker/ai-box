import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
    return (
        <div>
            <Button variant={"destructive"} size={"lg"}>
                click me
            </Button>
            <p className=" text-6xl text-green-500">Hello AI Box!</p>
        </div>
    );
}

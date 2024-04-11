import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
    return (
        <div className="p-5">
            <form>
                <h1>Trang sức tuyệt đẹp</h1>
                <Button className="mt-2" type="submit">
                    Buy now
                </Button>
            </form>
        </div>
    );
}

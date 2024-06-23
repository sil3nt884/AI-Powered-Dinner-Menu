import RecipeContainer from "@/app/Recpies/RecipeContainer";
import HomePage from "@/app/Home";
import DinerList from "@/app/Dinners/DinnersList";


export default function Home() {

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
         <HomePage DinnerList={ <DinerList></DinerList>}>
            <RecipeContainer />
        </HomePage>
    </div>
  );
}

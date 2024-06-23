'use server'
type Dinner = {
    name: string;
    url: string;
}
export default  async  function DinnersList() {

    const endpoint = process.env.DINNERS_ENDPOINT ?? '';

    const data: Dinner[]  = await (await fetch(endpoint, { cache: 'no-store' })).json();

    if(!data) {
        return <h1> No Dinners </h1>
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {data.map((dinner, index) => {
                return (
                    <div key={index}
                         className="flex flex-col items-center justify-center space-y-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mb-5 p-5 border border-gray-300 rounded-lg shadow-lg">
                        <h1 className="text-lg md:text-xl lg:text-2xl">{dinner.name}</h1>
                        <a href={dinner.url} className="text-blue-500 hover:text-blue-800 underline">{dinner.url}</a>
                    </div>
                )
            })}
        </div>
    )
}

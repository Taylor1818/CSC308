/*

REFLECTION ON TDD

Starting off it was a bit difficult to get used to the style. However, once i set my mind to doing it in that order
it was not so bad. Going through the different steps and then updating the to the new possible outomes was better than i thought.
I can see the benefit to doing it like this as it makes sure that you are able to get the result that you want right away rather than
forcing yourself to search for the different fails that your already written code may have. Overall if this was the way that
my job or team wanted to do it I would not be apposed to it. This was not as bad as i thought, but getting used to the idea
was the more difficult part.

*/


class portfolio{

    constructor(){
        this.stocks = new Map();
    }

    isEmpty(){
        return this.stocks.size == 0;
    }

    buy(ticker, amount){
        this.stocks.set(ticker, ( this.stocks.get(ticker) || 0 ) + amount)
    }

    sell(ticker, amount){
        if(this.stocks.get(ticker) != undefined){
            if( this.stocks.get(ticker) - amount < 0 ){
                    throw new Error("Not possible to sell this number of shares.")
                }
            
            this.stocks.set(ticker, this.stocks.get(ticker) - amount);

            if(this.stocks.get(ticker) <= 0){
                this.stocks.delete(ticker);
            }
        }
        else{
            throw new Error("You do not own this Ticker.");
        }
    }

    owned(){
        return this.stocks.size;
    }

    tickerShares(ticker){
        if(this.stocks.get(ticker) == undefined){
            return 0;
        }
        return this.stocks.get(ticker);
    }
}

exports.portfolio = portfolio;
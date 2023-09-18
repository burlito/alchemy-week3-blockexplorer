


export function Transation({transaction}) {
    return (
        <div>Transaction Hash: {transaction.hash}</div>
    );
}

export function Transactions({transactionList}) {
    let container = [];

    transactionList.forEach((v, i) => {
       container.push(
           <Transation transaction={v}/>
       );
    });

    return(
        <div>{container}</div>
    )
}


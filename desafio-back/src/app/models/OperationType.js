const OperationType = new Map();
OperationType.set(1, {
    desc: 'Debit',
    sum: true
});
OperationType.set(2, {
    desc: 'Ticket',
    sum: false
});
OperationType.set(3, {
    desc: 'Financing',
    sum: false
});
OperationType.set(4, { 
    desc: 'Credit',
    sum: true
});
OperationType.set(5, { 
    desc: 'Loan receipt',
    sum: true
});
OperationType.set(6, {
    desc: 'Sales',
    sum: true
});
OperationType.set(7, { 
    desc: 'TED receipt',
    sum: true
});
OperationType.set(8, { 
    desc: 'DOC receipt',
    sum: true
});
OperationType.set(9, {
    desc: 'Loan',
    sum: false
});


export default OperationType;
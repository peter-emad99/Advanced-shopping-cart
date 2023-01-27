import React, { useState } from 'react';

function Counter() {
	const [count, setCount] = useState(0);
	return (
		<div>
			<button onClick={() => setCount((c) => c + 1)}>+</button>
			<div>{count}</div>
		</div>
	);
}

export default Counter;

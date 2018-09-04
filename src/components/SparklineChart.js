import React from "react";
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from "react-sparklines";

export default props => {
	console.log("props :", props);

	return (
		<div>
			<Sparklines height={40} width={60} data={props.data}>
				<SparklinesLine color="red" />
			</Sparklines>
		</div>
	);
};

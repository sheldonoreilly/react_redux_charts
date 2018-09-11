import React from "react";
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from "react-sparklines";

export default props => {
	return (
		<div>
			<Sparklines height={200} width={200} data={props.data}>
				<SparklinesLine color="red" />
				<SparklinesReferenceLine type="avg" />
			</Sparklines>
			<div>{`Average ${props.units} : ${props.average}`}</div>
		</div>
	);
};

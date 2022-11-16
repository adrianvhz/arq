import Step from "./Step";

export default function Flight({ position, rotation, amount, flight }) {
	let { riser, tread } = flight;

	let steps = new Array(amount).fill(undefined);

	return (
		<group
			position={position}
			rotation={rotation}
		>
			{steps.map((step, index) => (
				<Step
					key={index}
					position={[0, riser * index, tread * index]}
					flight={flight}
				/>
			))}
		</group>
	)
}


{/* <Step position={[0, 0, 0]} />
<Step position={[0, riser, tread]} />
<Step position={[0, riser * 2, tread * 2]} />
<Step position={[0, riser * 3, tread * 3]} />
<Step position={[0, riser * 4, tread * 4]} />
<Step position={[0, riser * 5, tread * 5]} />
<Step position={[0, riser * 6, tread * 6]} />
<Step position={[0, riser * 7, tread * 7]} /> */}
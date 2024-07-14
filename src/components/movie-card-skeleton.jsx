import {
	Typography,
	Card,
	CardHeader,
	CardBody
} from "@material-tailwind/react"

const MovieCardSkeleton = () => (
    <Card color="transparent" shadow={false}>
        <CardHeader color="transparent" floated={false} className="mx-0 mt-0 mb-6">
            <Typography
                as="div"
                variant="h1"
                className="bg-gray-300 h-full w-full object-center animate-pulse"
                style={{ height: '500px' }}
            >
                &nbsp;
            </Typography>
        </CardHeader>
        <CardBody className="p-0">
            <Typography
                as="div"
                variant="h1"
                className="mb-4 rounded-full bg-gray-300 h-2 w-full object-center animate-pulse"
            >
                &nbsp;
            </Typography>
            <Typography
                as="div"
                variant="h1"
                className="mb-4 rounded-full bg-gray-300 h-2 w-full object-center animate-pulse"
            >
                &nbsp;
            </Typography>
            <Typography
                as="div"
                variant="h1"
                className="mb-4 rounded-full bg-gray-300 h-2 w-full object-center animate-pulse"
            >
                &nbsp;
            </Typography>
            <Typography
                as="div"
                variant="h1"
                className="mb-4 rounded-full bg-gray-300 h-2 w-full object-center animate-pulse"
            >
                &nbsp;
            </Typography>
        </CardBody>
    </Card>
)

export default MovieCardSkeleton
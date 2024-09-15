const Title = ({ title = "" }) => {
    return (
        <div className="py-2 md:py-4 text-lg 2xl:text-3xl xl:text-2xl lg:text-2xl md:text-2xl font-semibold">
            {title}
        </div>
    )
}

export default Title;
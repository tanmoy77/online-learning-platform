const shortText = (str, wordNum) => {
    return str.split(" ").slice(0, wordNum).join(" ") + (str.split(" ").length > wordNum ? "..." : "")
}

export default shortText;
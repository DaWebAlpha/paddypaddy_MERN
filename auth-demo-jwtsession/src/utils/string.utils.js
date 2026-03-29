class StringHelpers{
    cleanValue = (val) =>{
        return val.trim().replaceAll(/\s+/g, " ");
    }

    normalizeValue = (val) => {
        return this.cleanValue(val).toLowerCase();
    }
}

const stringHelpers = new StringHelpers();

export { stringHelpers };
export default stringHelpers;

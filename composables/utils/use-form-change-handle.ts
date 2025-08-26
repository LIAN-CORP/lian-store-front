export default function useFormChangeHandle() {
  function normalize(value: unknown) {
    if (typeof value == "string") {
      return value.trim();
    }
    return value;
  }

  function compareValues(obj1: Record<string, any>, obj2: Record<string, any>) {
    const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)]);
    for (const key of keys) {
      if (normalize(obj1[key]) !== normalize(obj2[key])) {
        return false;
      }
    }
    return true;
  }

  function hasChanges(initialValues: any, values: any, meta: any) {
    return computed(() => {
      return meta.value.dirty && !compareValues(values, initialValues);
    });
  }

  return {
    hasChanges,
  };
}

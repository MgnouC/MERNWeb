import { useMutation } from "@tanstack/react-query"

export const useMutationHooks = (fnCallback)  => {
    const mutation = useMutation({
        //mutationKey,
        mutationFn: fnCallback
    })
    return  mutation

}
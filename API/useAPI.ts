import type {IVariables} from "~/interfaces/IVariables";
import type {IData} from "~/interfaces/IData";

const query = gql`
  query GetMetrics($input: GetMetricsInput!) {
      metrics(input: $input) {
        browser
        device
        duration
        id
        isNew
        visitTime
      }
    }
`
export function useAPI(){
    return {
        async getMetrics(variables:IVariables){
            const { data, error } = await useAsyncQuery<IData>(query,variables)
            return {data, error}
        }
    }
}

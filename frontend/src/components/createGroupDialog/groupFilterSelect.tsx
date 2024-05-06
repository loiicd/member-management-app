import { useEffect, useMemo, useState } from 'react'
import { GroupFilter, GroupFilterFormData } from '../../types/groupFilter'
import { Qualification } from '../../types/qualification'
import { QualificationApiClient } from '../../services/qualificationApiClient'
import { useParams } from 'react-router-dom'
import { useAuthHeader } from 'react-auth-kit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import CircularProgress from '@mui/joy/CircularProgress'
import Select from '@mui/joy/Select'
import Option from '@mui/joy/Option'
import Button from '@mui/joy/Button'
import IconButton from '@mui/joy/IconButton'

interface GroupFilterSelectProps<T extends GroupFilter | GroupFilterFormData> {
  rules: T[]
  handleRulesChange: (updatedRules: T[]) => void
}

const GroupFilterSelect = <T extends GroupFilter | GroupFilterFormData>({ rules, handleRulesChange }: GroupFilterSelectProps<T>) => {
  const { accountId } = useParams<{ accountId: string }>()
  const authToken = useAuthHeader()()

  if (!accountId) throw new Error('Account ID required!')

  const qualificationApiClient = useMemo(() => new QualificationApiClient('http://localhost:3002', authToken, accountId), [accountId, authToken]) 
  const [loadingQualifications, setLoadingQualifications] = useState<boolean>(false)
  const [qualifications, setQualifications] = useState<Qualification[] | undefined>(undefined)

  useEffect(() => {
    setLoadingQualifications(true)
    qualificationApiClient.getQualifications(accountId)
      .then(data => setQualifications(data))
      .catch(error => alert(error))
      .finally(() => setLoadingQualifications(false))
  }, [qualificationApiClient, accountId])

  const handleChange = (field: keyof T, ruleIndex: number, value: string | null) => {
    const updatedRules = [...rules]
    updatedRules[ruleIndex] = { ...updatedRules[ruleIndex], [field]: value }
    handleRulesChange(updatedRules)
  }

  const handleAddRule = () => {
    const updatedRules = [...rules]
    updatedRules[updatedRules.length] = { ...updatedRules[updatedRules.length], entity: null, rule: null, value: null }
    handleRulesChange(updatedRules)
  }

  const handleRemoveRule = (ruleIndex: number) => {
    const updatedRules = [...rules]
    updatedRules.splice(ruleIndex, 1)
    handleRulesChange(updatedRules)
  }

  return (
    <div className='flex flex-col gap-2'>
      {rules.map((rule, ruleIndex) => (
        <div key={ruleIndex} className='flex justify-between gap-2'>
          <Select value={rule.entity} className='flex-grow' onChange={(event, value) => handleChange('entity', ruleIndex, value)}>
            <Option value='qualification'>Qualifikation</Option>
          </Select>
          <Select value={rule.rule} className='flex-grow' onChange={(event, value) => handleChange('rule', ruleIndex, value)}>
            <Option value='include'>enthält</Option>
            <Option value='exclude'>enthält nicht</Option>
          </Select>
          <Select 
            value={rule.value} 
            className='flex-grow' 
            onChange={(event, value) => handleChange('value', ruleIndex, value)}
            endDecorator={
              loadingQualifications ? (
                <CircularProgress size="sm" sx={{ bgcolor: 'background.surface' }} />
              ) : null
            }
          >
            {qualifications ? qualifications.map((qualification) => (
              <Option key={qualification.id} value={qualification.id} disabled={rules.some((rule) => rule.value === qualification.id)}>{qualification.name}</Option>))
              : <Option value='0' disabled>Fehler beim laden!</Option>  
            }
          </Select>
          <IconButton color='danger' onClick={() => handleRemoveRule(ruleIndex)}>
            <FontAwesomeIcon icon={icon({ name: 'xmark', style: 'solid' })} />
          </IconButton>
        </div>
      ))}
      <Button 
        variant='plain'
        startDecorator={<FontAwesomeIcon icon={icon({ name: 'plus', style: 'solid' })} />} 
        onClick={handleAddRule}
      >
        Neue Regel
      </Button>
    </div>
  )
}

export default GroupFilterSelect
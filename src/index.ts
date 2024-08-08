import * as dotenv from 'dotenv'
import * as readline from 'readline'
import {
  createSandbox,
  printExecutionResult,
} from './sandbox'

dotenv.config()

const sandbox = await createSandbox()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
})

console.log('\nEnter code (press Enter on an empty line to execute):')

let userInput = ''
rl.setPrompt('>>> ')
rl.prompt()
rl.on('line', async (line) => {
  if (line.trim() === '') {
    // Execute code when Enter is pressed on an empty line
    if (userInput.trim() !== '') {
      console.log(`Running code:
\`\`\`
${userInput}
\`\`\`
`)
      try {
        const result = await sandbox.notebook.execCell(userInput)
        printExecutionResult(result)
      } catch (error) {
        console.error('Error executing code:', error)
      }
      userInput = ''
      console.log('\nEnter code (press Enter on an empty line to execute):')
      rl.prompt()
    }
  } else if (line.trim().toUpperCase() === 'END') {
    rl.close()
  } else {
    // Add new line to userInput (simulating Shift+Enter behavior)
    userInput += line + '\n'
    rl.prompt() // Show prompt for next line
  }
})

await new Promise((resolve) => rl.on('close', resolve))



// You can use sandbox.kill() to kill the sandbox immediately
await sandbox.kill()
console.log('  ✔︎ Sandbox killed')
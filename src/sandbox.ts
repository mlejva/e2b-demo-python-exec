import { CodeInterpreter, Execution } from '@e2b/code-interpreter'


// After 10 minutes, the sandbox will get automatically killed
// If you need to keep the sandbox alive, you can call `sandbox.setTimeout(<newTimeoutValue>)` which will reset the timer
const sandboxLifetime = 5 * 60 * 1000 // 5 minutes

export async function createSandbox() {
  console.log(`✴️ Creating Code Interpreter sandbox...`)
  const codeInterpreterSandbox = await CodeInterpreter.create({ timeoutMs: sandboxLifetime })
  console.log('  ✔︎ Sandbox created:', codeInterpreterSandbox.sandboxId)

  return codeInterpreterSandbox
}

export async function printExecutionResult(codeExec: Execution) {
  // Read more about the execution object:
  // https://e2b.dev/docs/code-interpreter/execution#execution-object

  if (codeExec.logs.stdout.length > 0 || codeExec.results.length > 0) {
    if (codeExec.logs.stdout) {
      console.log('=== Stdout logs ===\n');
      console.log('  ', codeExec.logs.stdout);
      console.log('\n============================\n')
    }
    if (codeExec.results.length > 0) {
      console.log('=== Execution result ===\n')
      console.log('  ', codeExec.results);
      console.log('\n============================\n')
    }
  }

  if (codeExec.logs.stderr.length > 0 || codeExec.error) {
    if (codeExec.logs.stderr.length > 0) {
      console.log('=== ❌ Stderr logs ===\n');
      console.error('  ', codeExec.logs.stderr);
      console.log('\n============================\n')
    }
    if (codeExec.error) {
      console.log('=== ❌ Python runtime error ===\n')
      console.error('  ', codeExec.error)
      console.log('\n============================\n')
    }
  }

  if (codeExec.logs.stdout.length === 0 && codeExec.logs.stderr.length === 0 && !codeExec.error) {
    console.log('✴️ No output')
  }
}